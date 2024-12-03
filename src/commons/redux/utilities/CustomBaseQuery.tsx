import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import handleError from './ErrorHandler';

const CustomBaseQuery = ({ baseUrl }) =>
  async (args, api, extraOptions) => {

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

    let result = await baseQuery(args, api, extraOptions);

    // If the access token is expired, attempt to refresh it
    if (result.error?.status === 401) {
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
        const refreshResultData = refreshResult.data as any;

        // Dispatch the new tokens to the Redux store
        api.dispatch({
          type: 'account/refreshToken',
          payload: {
            accessToken: refreshResultData.access,
            refreshToken: refreshResultData.refresh || api.getState().account?.refreshToken,
          },
        });

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Handle refresh token failure
        handleError({ error: refreshResult.error, dispatch: api.dispatch });
      }
    }

    if (result.error) {
      args.body?.onFailure?.(result);
      handleError({ error: result.error, dispatch: api.dispatch });
    } else {
      args.body?.onSuccess?.(result);
    }

    return result;
  };

export default CustomBaseQuery;
