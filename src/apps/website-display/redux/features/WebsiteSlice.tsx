import { WebsiteType, PageMetadataType } from 'commons/types/global';
import { WebsiteManagementServiceApi } from './ManageWebsiteServiceApiSlice'

type WebsitePermissionsType = {
  isAdmin: boolean;
}

export const WebsiteSlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getWebsite: builder.query<WebsiteType, void>({
      providesTags: [{ type: 'Website' }],
      query: () => ({
        url: `website/get-website/`,
        isSimpleRequest: true,
      })
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
      query: ({ pageAddress }) => ({
        url: `appearance/get-page-metadata/?page_address=${pageAddress}`,
        isSimpleRequest: true,
      })
    })
  })
})

export const {
  useGetWebsiteQuery,
  useGetWebsitePermissionQuery,
  useGetPageMetadataQuery,
} = WebsiteSlice;
