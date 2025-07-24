import { PurchaseType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type ApplyDiscountCodeInputType = {
  merchandiseId: number;
  discountCode: string;
}

type ApplyDiscountCodeOutputType = {
  new_price: number;
};

type PurchaseInputType = {
  merchandiseId: number;
  discountCode: string;
}

type PurchaseOutputType = PurchaseType & {
  payment_link: string;
  is_payment_required: boolean;
};

export const PurchaseSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    applyDiscountCode: builder.mutation<ApplyDiscountCodeOutputType, ApplyDiscountCodeInputType>({
      query: ({ ...body }) => ({
        url: `sale/payment/apply_discount_code/`,
        method: 'POST',
        body: {
          merchandise: body.merchandiseId,
          code: body.discountCode,
        },
      }),
    }),

    purchase: builder.mutation<PurchaseOutputType, PurchaseInputType>({
      invalidatesTags: tagGenerationWithErrorCheck([{ type: 'registration-receipt', id: 'MY' }]),
      query: ({ ...body }) => ({
        url: `sale/payment/purchase/`,
        method: 'POST',
        body: {
          merchandise: body.merchandiseId,
          code: body.discountCode,
        },
      }),
    }),

    getUserPurchases: builder.query<PurchaseType[], { userId: string; programSlug: string }>({
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Purchase' as const, id })),
            { type: 'Purchase', id: 'LIST' },
          ]
          : [{ type: 'Purchase', id: 'LIST' }],
      query: ({ userId, programSlug }) => ({
        url: 'sale/purchases/by-user-program/',
        params: {
          user_id: userId,
          program_slug: programSlug,
        },
      }),
    }),

  }),
});

export const {
  useGetUserPurchasesQuery,
  useApplyDiscountCodeMutation,
  usePurchaseMutation,
} = PurchaseSlice;
