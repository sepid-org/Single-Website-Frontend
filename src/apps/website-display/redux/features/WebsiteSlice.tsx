import { WebsiteType, PageMetadataType } from 'commons/types/global';
import { WebsiteManagementServiceApi } from './ManageWebsiteServiceApiSlice'

type WebsitePermissionsType = {
  isAdmin: boolean;
}

export const WebsiteSlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getWebsite: builder.query<WebsiteType, void>({
      providesTags: [{ type: 'Website' }],
      query: () => `website/get-website/`,
    }),
    getWebsitePermission: builder.query<WebsitePermissionsType, void>({
      providesTags: [{ type: 'Website', id: 'MY' }],
      query: () => `website/permissions/`,
      transformResponse: (response: any): WebsitePermissionsType => {
        return {
          isAdmin: response.is_admin,
        };
      },
    }),
    getPageMetadata: builder.query<PageMetadataType, { pageAddress: string }>({
      query: ({ pageAddress }) => `appearance/get-page-metadata/?page_address=${pageAddress}`,
    })
  })
})

export const {
  useGetWebsiteQuery,
  useGetWebsitePermissionQuery,
  useGetPageMetadataQuery,
} = WebsiteSlice;
