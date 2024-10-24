import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { FilmBaziApiUrl } from '../constants/Urls';

export const FilmbaziApi = createApi({
  reducerPath: 'filmbazi',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: FilmBaziApiUrl }),
  endpoints: build => ({
  })
})
