import { createApi } from '@reduxjs/toolkit/query/react'
import { WMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { ContentManagementServiceApi } from './ManageContentServiceApiSlice';
import { PartyManagementServiceApi } from './ManagePartyServiceApiSlice';

export const WebsiteManagementServiceApi = createApi({
  reducerPath: 'manage-website-service',
  tagTypes: [
    'website',
    'user-specific-data',
  ],
  baseQuery: CustomBaseQuery({ baseUrl: WMS_URL + 'api/' }),
  endpoints: build => ({
  })
})

export const createInvalidationCallback = (tags) => {
  return async (_, { dispatch, queryFulfilled }) => {
    try {
      await queryFulfilled;
      dispatch(PartyManagementServiceApi.util.invalidateTags(tags));
      dispatch(ContentManagementServiceApi.util.invalidateTags(tags));
      dispatch(WebsiteManagementServiceApi.util.invalidateTags(tags));
    } catch (error) {
      console.error('Failed to invalidate tags:', error);
      // Additional error handling if needed
    }
  };
};
