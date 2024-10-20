import { PurchaseType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type ApplyDiscountCodeInputType = {
  merchandiseId: string;
  discountCode: string;
}

type ApplyDiscountCodeOutputType = {
  new_price: number;
};

type PurchaseInputType = {
  merchandiseId: string;
  discountCode: string;
}

type PurchaseOutputType = PurchaseType;

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
