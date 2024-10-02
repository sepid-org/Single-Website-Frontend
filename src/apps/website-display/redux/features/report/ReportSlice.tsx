import { FileType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetRegistrationReceiptsFileInputType = {
  formId: string;
}

type GetRegistrationReceiptsFileOutputType = FileType;

type GetAnswerSheetsFileInputType = {
  formId: string;
}

type GetAnswerSheetsFileOutputType = FileType;

type GetProgramMerchandisesPurchasesFileInputType = {
  programSlug: string;
}

type GetProgramMerchandisesPurchasesFileOutputType = FileType;

export const ReportSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    getRegistrationReceiptsFile: builder.query<GetRegistrationReceiptsFileOutputType, GetRegistrationReceiptsFileInputType>({
      providesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/reports/registration-receipts/?registration_form_id=${formId}`,
      }),
    }),

    getAnswerSheetsFile: builder.query<GetAnswerSheetsFileOutputType, GetAnswerSheetsFileInputType>({
      providesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/reports/answer-sheets/?form_id=${formId}`,
      }),
    }),

    getProgramMerchandisesPurchasesFile: builder.query<GetProgramMerchandisesPurchasesFileOutputType, GetProgramMerchandisesPurchasesFileInputType>({
      providesTags: ['programs'],
      query: ({ programSlug }) => ({
        url: `/reports/program-merchandises-purchases/?program_id=${programSlug}`,
      }),
    }),

  })
});

export const {
  useLazyGetRegistrationReceiptsFileQuery,
  useLazyGetAnswerSheetsFileQuery,
  useLazyGetProgramMerchandisesPurchasesFileQuery,
} = ReportSlice;
