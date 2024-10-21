import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { AshbariaApiUrl } from '../constants/urls';

export const AshbariaApi = createApi({
  reducerPath: 'ashbaria',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: AshbariaApiUrl }),
  endpoints: build => ({
  })
})
