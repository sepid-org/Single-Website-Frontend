import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { BANK_URL } from 'commons/configs/Constants';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const BankApi = createApi({
  reducerPath: 'bank',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: BANK_URL }),
  endpoints: build => ({
  })
})
