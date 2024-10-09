import { createApi } from '@reduxjs/toolkit/query/react'
import { PMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const PartyManagementServiceApi = createApi({
  reducerPath: 'manage-party-service',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: PMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
