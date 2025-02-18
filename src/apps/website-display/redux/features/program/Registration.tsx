import { RegistrationReceiptTypes } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type ValidateRegistrationInputType = {
  receiptId: number;
  status: RegistrationReceiptTypes;
}

type ConfirmRegistrationInputType = {
  receiptId: number;
};

const RegistrationSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    updateRegistrationStatus: builder.mutation<void, ValidateRegistrationInputType>({
      query: ({ receiptId, ...props }) => ({
        url: `/fsm/receipts/${receiptId}/update-registration-status/`,
        method: 'POST',
        body: props,
      }),
      invalidatesTags: ['registration-receipt'],
    }),

    confirmRegistration: builder.mutation<void, ConfirmRegistrationInputType>({
      query: ({ receiptId }) => ({
        url: `/fsm/receipts/${receiptId}/confirm-registration/`,
        method: 'POST',
      }),
      invalidatesTags: ['registration-receipt'],
    }),
  })
});

export const {
  useUpdateRegistrationStatusMutation,
  useConfirmRegistrationMutation,
} = RegistrationSlice;
