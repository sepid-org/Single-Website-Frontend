import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { ParvandeZamingirApiUrl } from '../constants/urls';

export const ParvandeZamingirApi = createApi({
  reducerPath: 'parvande-zamingir',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: ParvandeZamingirApiUrl }),
  endpoints: build => ({
  })
})
