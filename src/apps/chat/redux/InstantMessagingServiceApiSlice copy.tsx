import { createApi } from '@reduxjs/toolkit/query/react'
import { IMS_URL } from 'commons/configs/Constants';
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';

export const InstantMessagingServiceApiSlice = createApi({
  reducerPath: 'instant-messaging-service',
  tagTypes: [],
  baseQuery: CustomBaseQuery({ baseUrl: IMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
