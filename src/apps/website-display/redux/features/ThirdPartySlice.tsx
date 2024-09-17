import { ProgramType } from 'commons/types/models';
import { WebsiteManagementServiceApi } from './ManageWebsiteServiceApiSlice';

export const ThirdPartySlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getThirdParties: builder.query<ProgramType[], void>({
      query: () => `third-party/get-third-party/`,
    })
  })
});

export const { useGetThirdPartiesQuery } = ThirdPartySlice;
