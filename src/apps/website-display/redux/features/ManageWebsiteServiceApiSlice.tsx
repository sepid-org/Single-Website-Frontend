import { createApi } from '@reduxjs/toolkit/query/react'
import { WMS_URL } from 'commons/configs/Constants'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const WebsiteManagementServiceApi = createApi({
  reducerPath: 'manage-website-service',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: WMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
