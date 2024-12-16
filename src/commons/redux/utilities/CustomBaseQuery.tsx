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

const CustomBaseQuery = ({ baseUrl }: { baseUrl: string }) =>
  async (args: BaseQueryArgs | string, api, extraOptions) => {
    // Create base query with header preparation
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as any;

        // Add access token if available
        const accessToken = state.account?.accessToken;
        if (accessToken) {
          headers.set('Authorization', `JWT ${accessToken}`);
        }

        // Add website header
        const website = state.website?.website;
        if (website) {
          headers.set('Website', website?.name);
        }

        // Add FSM header
        const fsm = state.fsm?.fsm;
        if (fsm) {
          headers.set('FSM', fsm.id);
        }

        return headers;
      },
    });

    // Perform initial query
    let result = await baseQuery(args, api, extraOptions);

    // Handle token expiration (401 status)
    if (result.error?.status === 401) {
      try {
        // Attempt to refresh token
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

        // Successfully refreshed token
        if (refreshResult.data) {
          const refreshResultData = refreshResult.data as RefreshTokenResponse;

          // Update tokens in Redux store
          api.dispatch({
            type: 'account/refreshToken',
            payload: {
              accessToken: refreshResultData.access,
              refreshToken: refreshResultData.refresh || api.getState().account?.refreshToken,
            },
          });

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token failed
          handleError({
            error: refreshResult.error,
            dispatch: api.dispatch
          });
        }
      } catch (error) {
        // Handle any unexpected errors during token refresh
        handleError({
          error,
          dispatch: api.dispatch
        });
      }
    }

    // Handle successful or failed requests
    if (result.error) {
      // Call onFailure callback if provided
      (args as BaseQueryArgs).body?.onFailure?.(result);

      // Handle and display error
      handleError({
        error: result.error,
        dispatch: api.dispatch
      });
    } else {
      // Call onSuccess callback if provided
      (args as BaseQueryArgs).body?.onSuccess?.(result);
    }

    return result;
  };

export default CustomBaseQuery;