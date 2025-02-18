import { createApi } from '@reduxjs/toolkit/query/react'
import { IMS_URL } from 'commons/constants/Constants';
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';

export const InstantMessagingServiceApiSlice = createApi({
  reducerPath: 'instant-messaging-service',
  tagTypes: [],
  baseQuery: customBaseQuery({ baseUrl: IMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
