import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleError from './ErrorHandler';

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
const BASE_DELAY = 1000; // 1 second initial delay

const CustomBaseQuery = ({ baseUrl }: { baseUrl: string }) =>
  async (args: BaseQueryArgs | string, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as any;

        const accessToken = state.account?.accessToken;
        if (accessToken) {
          headers.set('Authorization', `JWT ${accessToken}`);
        }

        const website = state.website?.website;
        if (website) {
          headers.set('Website', website?.name);
        }

        const fsm = state.fsm?.fsm;
        if (fsm) {
          headers.set('FSM', fsm.id);
        }

        return headers;
      },
    });

    let retries = 0;
    let result;

    while (retries < MAX_RETRIES) {
      try {
        // Perform the query
        result = await baseQuery(args, api, extraOptions);

        if (!result.error) return result;

        // Handle 401 errors for token refresh
        if (result.error?.status === 401) {
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

              api.dispatch({
                type: 'account/refreshToken',
                payload: {
                  accessToken: refreshResultData.access,
                  refreshToken: refreshResultData.refresh || api.getState().account?.refreshToken,
                },
              });

              // Retry original request with the new token
              result = await baseQuery(args, api, extraOptions);
            } else {
              handleError({
                error: refreshResult.error,
                dispatch: api.dispatch
              });
              break; // Stop retrying if token refresh fails
            }
          } catch (error) {
            handleError({
              error,
              dispatch: api.dispatch
            });
            break; // Stop retrying if an unexpected error occurs
          }
        }

        // Exit retry loop if non-retriable error
        if (result.error?.status !== 500 && result.error?.status !== 'FETCH_ERROR') {
          break;
        }

        // Exponential backoff
        const delay = BASE_DELAY * Math.pow(2, retries);
        await new Promise(resolve => setTimeout(resolve, delay));

        retries++;
      } catch (error) {
        // Handle unexpected errors
        if (retries === MAX_RETRIES - 1) {
          throw error;
        }
      }
    }

    // Handle successful or failed requests
    if (result.error) {
      (args as BaseQueryArgs).body?.onFailure?.(result);

      handleError({
        error: result.error,
        dispatch: api.dispatch
      });
    } else {
      (args as BaseQueryArgs).body?.onSuccess?.(result);
    }

    return result;
  };

export default CustomBaseQuery;
