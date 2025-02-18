import { RegistrationReceiptType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

export const ReceiptSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getReceipt: builder.query<RegistrationReceiptType, { receiptId: string }>({
      providesTags: (result, error, item) => {
        if (!error) {
          return (
            [{ type: 'registration-receipt', id: result?.id }])
        }
      },
      query: ({ receiptId }) => `fsm/receipts/${receiptId}/`,
      transformResponse: (response: any): RegistrationReceiptType => {
        return response;
      },
    }),

    deleteReceipt: builder.mutation<RegistrationReceiptType, { receiptId: string }>({
      invalidatesTags: ['registration-receipts'],
      query: ({ receiptId }) => ({
        url: `fsm/receipts/${receiptId}/`,
        method: 'DELETE',
      }),
    }),

    getMyReceipt: builder.query<RegistrationReceiptType, { formId: string }>({
      providesTags: [{ type: 'registration-receipt', id: 'MY' }],
      query: ({ formId }) => `fsm/receipts/my_receipt/?form=${formId}`,
      transformResponse: (response: any): RegistrationReceiptType => {
        return response;
      },
    }),
  })
});

export const {
  useGetReceiptQuery,
  useDeleteReceiptMutation,
  useGetMyReceiptQuery,
} = ReceiptSlice;
