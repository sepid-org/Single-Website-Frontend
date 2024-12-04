import { DiscountCodeType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';


export const FilmsSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    addNewDiscountCodes: builder.mutation({
      query: ({ filmId, file }) => {
        const formData = new FormData();
        formData.append('film_id', filmId);
        formData.append('file', file);

        return {
          url: '/films/add-new-discount-codes/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['DiscountCode'],
    }),

    updateDiscountCodes: builder.mutation({
      query: ({ filmId, file }) => {
        const formData = new FormData();
        formData.append('film_id', filmId);
        formData.append('file', file);

        return {
          url: '/films/update-discount-codes/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['DiscountCode'],
    }),

    getDiscountCode: builder.mutation<DiscountCodeType, { filmId: number }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-discount-code', id: 'MY' }
      ]),
      query: ({ filmId }) => `/films/discount-codes/get_discount_code/?film=${filmId}`,
    }),

    getMyDiscountCodes: builder.query<DiscountCodeType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-discount-code', id: 'MY' }
      ]),
      query: () => `/films/discount-codes/get_my_discount_codes/`,
    }),

  }),
  overrideExisting: false,
});

export const {
  useAddNewDiscountCodesMutation,
  useUpdateDiscountCodesMutation,
  useGetDiscountCodeMutation,
  useGetMyDiscountCodesQuery,
} = FilmsSlice;
