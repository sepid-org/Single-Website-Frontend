import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { CMS_URL } from 'commons/configs/Constants';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const ContentManagementServiceApi = createApi({
  reducerPath: 'manage-content-service',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: CMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
