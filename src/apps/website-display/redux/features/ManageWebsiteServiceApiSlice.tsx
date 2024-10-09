import { createApi } from '@reduxjs/toolkit/query/react'
import { WMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const WebsiteManagementServiceApi = createApi({
  reducerPath: 'manage-website-service',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: WMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
