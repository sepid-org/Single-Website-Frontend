import { createApi } from '@reduxjs/toolkit/query/react'
import CustomBaseQuery from 'commons/redux/utilities/CustomBaseQuery';
import { BANK_URL } from 'commons/configs/Constants';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const BankApi = createApi({
  reducerPath: 'bank',
  tagTypes,
  baseQuery: CustomBaseQuery({ baseUrl: BANK_URL }),
  endpoints: build => ({
  })
})
