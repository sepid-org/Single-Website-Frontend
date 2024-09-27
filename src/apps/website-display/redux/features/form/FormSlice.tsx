import { AnswerType, RegistrationFormType, RegistrationReceiptType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetFormOutputType = RegistrationFormType;

type SubmitFormInputType = {
  formId: string;
  answers: AnswerType[];
}

type SubmitFormOutputType = RegistrationReceiptType;

type UpdateFormInputType = Partial<RegistrationFormType>

type UpdateFormOutputType = any;

export const FormSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formId: string }>({
      providesTags: (result) => [{ type: 'form', id: result?.id }],
      query: ({ formId }) => `fsm/form/${formId}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),

    updateForm: builder.mutation<UpdateFormOutputType, UpdateFormInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'form', id: item.id }],
      query: ({ id, ...body }) => ({
        url: `fsm/form/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    submitForm: builder.mutation<SubmitFormOutputType, SubmitFormInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'receipt', id: item.formId }],
      query: ({ formId, ...body }) => ({
        url: `fsm/form/${formId}/submit/`,
        method: 'POST',
        body: {
          answer_sheet_type: 'General',
          ...body,
        },
      }),
    }),
  })
});

export const {
  useGetFormQuery,
  useUpdateFormMutation,
  useSubmitFormMutation,
} = FormSlice;
