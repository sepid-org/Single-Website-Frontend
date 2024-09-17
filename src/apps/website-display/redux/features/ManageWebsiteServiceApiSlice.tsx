import { createApi } from '@reduxjs/toolkit/query/react'
import { WMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';
import { ManagePartyServiceApi } from './ManagePartyServiceApiSlice';

export const ManageWebsiteServiceApi = createApi({
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
      dispatch(ManagePartyServiceApi.util.invalidateTags(tags));
      dispatch(ManageContentServiceApi.util.invalidateTags(tags));
      dispatch(ManageWebsiteServiceApi.util.invalidateTags(tags));
    } catch (error) {
      console.error('Failed to invalidate tags:', error);
      // Additional error handling if needed
    }
  };
};
