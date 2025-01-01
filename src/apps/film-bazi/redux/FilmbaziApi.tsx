import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { FilmBaziApiUrl } from '../constants/Urls';

export const FilmbaziApi = createApi({
  reducerPath: 'filmbazi',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: FilmBaziApiUrl }),
  endpoints: build => ({
  })
})
