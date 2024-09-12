import { createApi } from '@reduxjs/toolkit/query/react'
import { WMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from '../../../../commons/redux/utilities/CustomBaseQuery';

export const ManageWebsiteServiceApi = createApi({
  reducerPath: 'manage-website-service',
  tagTypes:[
    'website',
  ],
  baseQuery: CustomBaseQuery({ baseUrl: WMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
