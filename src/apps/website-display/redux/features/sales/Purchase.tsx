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
  })
});

export const {
  useApplyDiscountCodeMutation,
  usePurchaseMutation,
} = PurchaseSlice;
