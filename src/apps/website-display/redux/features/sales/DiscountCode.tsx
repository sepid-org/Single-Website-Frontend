import { CreateDiscountCodeDto, DiscountCodeType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type CreateDiscountCodeOutputType = DiscountCodeType;

type DeleteDiscountCodeInputType = {
  discountCodeId: string;
}

type DeleteDiscountCodeOutputType = void;

type GetProgramDiscountCodesInputType = {
  programSlug: string;
}

type GetProgramDiscountCodesOutputType = DiscountCodeType[];

export const MerchandiseSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createDiscountCode: builder.mutation<CreateDiscountCodeOutputType, CreateDiscountCodeDto>({
      invalidatesTags: tagGenerationWithErrorCheck(['discount-codes']),
      query: ({ ...body }) => ({
        url: `sale/discount_code/`,
        method: 'POST',
        body: {
          ...body,
        }
      }),
    }),

    deleteDiscountCode: builder.mutation<DeleteDiscountCodeOutputType, DeleteDiscountCodeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['discount-codes']),
      query: ({ discountCodeId }) => ({
        url: `sale/discount_code/${discountCodeId}/`,
        method: 'DELETE',
      }),
    }),

    getProgramDiscountCodes: builder.query<GetProgramDiscountCodesOutputType, GetProgramDiscountCodesInputType>({
      providesTags: ['discount-codes'],
      query: ({ programSlug }) => `sale/discount_code/program_discount_codes/?program=${programSlug}`,
      transformResponse: (response: any): GetProgramDiscountCodesOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useCreateDiscountCodeMutation,
  useDeleteDiscountCodeMutation,
  useGetProgramDiscountCodesQuery,
} = MerchandiseSlice;
