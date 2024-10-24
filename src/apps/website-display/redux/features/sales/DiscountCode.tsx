import { DiscountCodeType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type CreateDiscountCodeInputType = Partial<DiscountCodeType>

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
    createDiscountCode: builder.mutation<CreateDiscountCodeOutputType, CreateDiscountCodeInputType>({
      invalidatesTags: ['discount-codes'],
      query: ({ ...body }) => ({
        url: `sale/discount_code/`,
        method: 'POST',
        body: {
          ...body,
        }
      }),
    }),

    deleteDiscountCode: builder.mutation<DeleteDiscountCodeOutputType, DeleteDiscountCodeInputType>({
      invalidatesTags: ['discount-codes'],
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
