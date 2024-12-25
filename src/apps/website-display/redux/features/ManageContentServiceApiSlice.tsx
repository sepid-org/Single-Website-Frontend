import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { CMS_URL } from 'commons/configs/Constants';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const ContentManagementServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: CMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
