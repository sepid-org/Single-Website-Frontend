import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleError from './handleError';

interface RefreshTokenResponse {
  access: string;
  refresh?: string;
}

interface BaseQueryArgs {
  url: string;
  method?: string;
  body?: any;
  onSuccess?: (result: any) => void;
  onFailure?: (error: any) => void;
}

const MAX_RETRIES = 5;
const BACKOFF_FACTOR = 0.3;
const TIMEOUT = 10000; // 10 seconds in milliseconds
const STATUS_FORCELIST = [500, 502, 503, 504];

const getRandomJitter = () => Math.random() * 1000; // Jitter between 0ms and 1000ms

const refreshAccessToken = async (baseQuery: any, api: any, extraOptions: any) => {
  try {
    const refreshResult = await baseQuery(
      {
        url: '/auth/accounts/refresh/',
        method: 'POST',
        body: {
          refresh: api.getState().account?.refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const refreshResultData = refreshResult.data as RefreshTokenResponse;

      // Dispatch token refresh action
      api.dispatch({
        type: 'account/refreshToken',
        payload: {
          accessToken: refreshResultData.access,
          refreshToken: refreshResultData.refresh || api.getState().account?.refreshToken,
        },
      });

      return true;
    }

    return false;
  } catch (error) {
    handleError({ error, dispatch: api.dispatch });
    return false;
  }
};

const customBaseQuery = ({ baseUrl }: { baseUrl: string }) =>
  async (args: BaseQueryArgs | string, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as any;
        const accessToken = state.account?.accessToken;
        const website = state.website?.website;
        const fsm = state.fsm?.fsm;

        if (accessToken) headers.set('Authorization', `JWT ${accessToken}`);
        if (website) headers.set('Website', website?.name);
        if (fsm) headers.set('FSM', fsm.id);

        return headers;
      },
    });

    let retries = 0;
    let result;

    const method = typeof args === 'string' ? 'GET' : args.method?.toUpperCase() || 'GET';

    while (retries < MAX_RETRIES) {
      try {
        result = await baseQuery(args, api, extraOptions);

        if (!result.error) break;

        if (result.error?.status === 401) {
          // Try refreshing the access token
          const tokenRefreshed = await refreshAccessToken(baseQuery, api, extraOptions);
          if (tokenRefreshed) {
            // Retry original request with new token
            result = await baseQuery(args, api, extraOptions);
            if (!result.error) break;
          }
        }

        // Retry for specific error status codes
        if (!STATUS_FORCELIST.includes(result.error?.status as number) && result.error?.status !== 'FETCH_ERROR') {
          break;
        }

        // Exponential backoff with jitter
        const delay = BACKOFF_FACTOR * (1 << retries) * 1000 + getRandomJitter();
        await new Promise(resolve => setTimeout(resolve, delay));

        retries++;
      } catch (error) {
        // Handle network errors (timeouts or network failures)
        if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'TypeError') && retries < MAX_RETRIES - 1) {
          retries++;
          continue;
        }

        // Return a formatted error response similar to the Python version
        return {
          error: {
            status: 500,
            data: {
              error: `Failed to process ${method} request after retries: ${error}`,
            },
          },
        };
      }
    }

    // Handle successful or failed requests
    if (result.error) {
      (args as BaseQueryArgs).body?.onFailure?.(result);
      handleError({ error: result.error, dispatch: api.dispatch });
    } else {
      (args as BaseQueryArgs).body?.onSuccess?.(result);
    }

    return result;
  };

export default customBaseQuery;