import { createApi } from '@reduxjs/toolkit/query/react'
import { PMS_URL } from 'commons/configs/Constants'
import CustomBaseQuery from '../../../../commons/redux/utilities/CustomBaseQuery';

export const ManagePartyServiceApi = createApi({
  reducerPath: 'manage-party-service',
  baseQuery: CustomBaseQuery({ baseUrl: PMS_URL + 'api/' }),
  endpoints: build => ({
  })
})
