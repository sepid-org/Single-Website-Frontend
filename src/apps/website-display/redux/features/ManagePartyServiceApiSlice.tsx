import { createApi } from '@reduxjs/toolkit/query/react'
import { PMS_URL } from 'commons/configs/Constants'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const PartyManagementServiceApi = createApi({
  reducerPath: 'manage-party-service',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: PMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
