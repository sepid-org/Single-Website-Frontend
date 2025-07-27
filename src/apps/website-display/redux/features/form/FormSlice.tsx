import { AnswerType, FormType, RegistrationFormType, RegistrationReceiptType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetFormOutputType = FormType;

type SubmitFormInputType = {
  formSlug: string;
  answers: AnswerType[];
}

type SubmitFormOutputType = FormType;

type UpdateFormInputType = Partial<RegistrationFormType>

type UpdateFormOutputType = any;

export const FormSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formSlug: string }>({
      providesTags: (result) => [{ type: 'form', id: result?.slug }],
      query: ({ formSlug }) => `fsm/form/${formSlug}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),

    updateForm: builder.mutation<UpdateFormOutputType, UpdateFormInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'form', id: item.id }],
      query: ({ slug, ...body }) => ({
        url: `fsm/form/${slug}/`,
        method: 'PATCH',
        body,
      }),
    }),

    submitForm: builder.mutation<SubmitFormOutputType, SubmitFormInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return [
            { type: 'answer-sheet', id: result.id },
          ]
        }
      },
      query: ({ formSlug, ...body }) => ({
        url: `fsm/form/${formSlug}/submit/`,
        method: 'POST',
        body,
      }),
    }),
  })
});

export const {
  useGetFormQuery,
  useUpdateFormMutation,
  useSubmitFormMutation,
} = FormSlice;
