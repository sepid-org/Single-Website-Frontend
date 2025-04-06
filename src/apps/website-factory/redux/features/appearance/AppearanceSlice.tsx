import { WebsiteManagementServiceApi } from 'apps/website-display/redux/features/ManageWebsiteServiceApiSlice';

type UpdateThemeInputType = {
  font: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
};

type UpdateThemeOutputType = {};

export const AppearanceSlice = WebsiteManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    updateTheme: builder.mutation<UpdateThemeOutputType, UpdateThemeInputType>({
      query: (body: UpdateThemeInputType) => ({
        url: 'website/update-theme/',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateThemeOutputType => {
        return {
          message: response.message,
        };
      },
    }),
  }),
});

export const {
  useUpdateThemeMutation,
} = AppearanceSlice;