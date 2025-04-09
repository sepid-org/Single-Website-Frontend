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

type ThemeBody = {
  text: string;
  accent: string;
  primary: string;
  secondary: string;
  background: string;
};

type Theme = {
  title: string;
  body: ThemeBody;
};

type ThemesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Theme[];
};

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

    getThemeTemplates: builder.query<ThemesResponse, void>({
      query: () => 'appearance/themes/templates/',
      providesTags: ['ThemeTemplates'], // Add appropriate tag if needed
    }),

  }),
});

export const {
  useUpdateThemeMutation,
  useGetThemeTemplatesQuery
} = AppearanceSlice;