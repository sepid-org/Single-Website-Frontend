import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice';

type UpdateWebsiteInputType = {
  title?: string;
  mobile_image?: string;
  desktop_image?: string;
};

type UpdateWebsiteOutputType = {};

export const AppearanceSlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    updateWebsite: builder.mutation<UpdateWebsiteOutputType, UpdateWebsiteInputType>({
      query: (body: UpdateWebsiteInputType) => ({
        url: 'website/website/update-info/',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateWebsiteOutputType => {
        return {
          message: response.message,
        };
      },
    }),
  }),
});

export const {
  useUpdateWebsiteMutation,
} = AppearanceSlice;
