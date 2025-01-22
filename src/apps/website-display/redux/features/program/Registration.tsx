import { RegistrationReceiptTypes } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type ValidateRegistrationInputType = {
  receiptId: number;
  status: RegistrationReceiptTypes;
}

export const RegistrationSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    validateRegistrationReceipt: builder.mutation<void, ValidateRegistrationInputType>({
      query: ({ receiptId, ...props }) => ({
        url: `/fsm/receipts/${receiptId}/validate/`,
        body: props,
      }),
      invalidatesTags: ['Registration'],
    }),
  })
});

export const {
  useValidateRegistrationReceiptMutation,
} = RegistrationSlice;
