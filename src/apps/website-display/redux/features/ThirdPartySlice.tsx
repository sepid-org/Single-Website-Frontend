import { ThirdPartyType } from 'commons/types/models';
import { WebsiteManagementServiceApi } from './ManageWebsiteServiceApiSlice';

export const ThirdPartySlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getThirdParties: builder.query<ThirdPartyType[], void>({
      query: () => ({
        url: `third-party/get-third-party/`,
        isSimpleRequest: true,
      }),
    })
  })
});

export const { useGetThirdPartiesQuery } = ThirdPartySlice;
