import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { AshbariaApiUrl } from '../constants/urls';

export const AshbariaApi = createApi({
  reducerPath: 'ashbaria',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: AshbariaApiUrl }),
  endpoints: build => ({
  })
})
