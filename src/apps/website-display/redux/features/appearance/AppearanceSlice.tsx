import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from 'commons/redux/utilities/customBaseQuery';
import { CMS_URL } from 'commons/constants/Constants';
import { tagTypes } from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type UpdateFontInputType = {
  font: string;
};

type UpdateFontOutputType = {};

type UpdatePaletteInputType = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
};

type UpdatePaletteOutputType = {};

export const AppearanceSlice = createApi({
  reducerPath: 'appearance-settings-api',
  tagTypes,
  baseQuery: customBaseQuery({ baseUrl: CMS_URL + 'api/' }),
  endpoints: (builder) => ({
    updateFont: builder.mutation<UpdateFontOutputType, UpdateFontInputType>({
      query: (body: UpdateFontInputType) => ({
        url: 'website/update-font/',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFontOutputType => {
        return {
          message: response.message,
        };
      },
    }),

    updatePalette: builder.mutation<UpdatePaletteOutputType, UpdatePaletteInputType>({
      query: (body: UpdatePaletteInputType) => ({
        url: 'website/update-palette/',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdatePaletteOutputType => {
        return {
          message: response.message,
        };
      },
    }),
  }),
});

export const {
  useUpdateFontMutation,
  useUpdatePaletteMutation,
} = AppearanceSlice;