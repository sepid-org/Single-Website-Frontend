import { AnswerType, RegistrationReceiptType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type SubmitRegistrationFormInputType = {
  formId: string;
  answers: AnswerType[];
}

type SubmitRegistrationFormOutputType = RegistrationReceiptType;

type GetFormAnswerSheetOutputType = {
  count: number;
  results: RegistrationReceiptType[];
}

export const RegistrationFormSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getRegistrationFormAnswerSheets: builder.query<GetFormAnswerSheetOutputType, { formId: string, pageNumber: string }>({
      providesTags: ['registration-receipts'],
      query: ({ formId, pageNumber }) => `fsm/registration/${formId}/receipts/?page=${pageNumber}`,
      transformResponse: (response: any): GetFormAnswerSheetOutputType => {
        return response;
      },
    }),

    submitRegistrationForm: builder.mutation<SubmitRegistrationFormOutputType, SubmitRegistrationFormInputType>({
      invalidatesTags: [{ type: 'registration-receipt', id: 'MY' }],
      query: ({ formId, ...body }) => ({
        url: `fsm/registration/${formId}/register/`,
        method: 'POST',
        body: {
          answer_sheet_type: 'RegistrationReceipt',
          ...body,
        },
      }),
    }),

  })
});

export const {
  useGetRegistrationFormAnswerSheetsQuery,
  useSubmitRegistrationFormMutation,
} = RegistrationFormSlice;
