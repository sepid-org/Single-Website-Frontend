import { RegistrationReceiptTypes } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type ValidateRegistrationInputType = {
  receiptId: number;
  status: RegistrationReceiptTypes;
}

const RegistrationSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    validateRegistrationReceipt: builder.mutation<void, ValidateRegistrationInputType>({
      query: ({ receiptId, ...props }) => ({
        url: `/fsm/receipts/${receiptId}/validate/`,
        method: 'POST',
        body: props,
      }),
      invalidatesTags: ['registration-receipt'],
    }),
  })
});

export const {
  useValidateRegistrationReceiptMutation,
} = RegistrationSlice;
