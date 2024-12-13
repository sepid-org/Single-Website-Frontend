import { FileType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';

type GetParticipantsFileInputType = {
  formId: string;
}

type GetParticipantsFileOutputType = FileType;

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

    getParticipantsFile: builder.query<GetParticipantsFileOutputType, GetParticipantsFileInputType>({
      providesTags: [{ type: 'Program', id: 'ALL' }],
      query: ({ formId }) => ({
        url: `/report/participants/?registration_form_id=${formId}`,
      }),
    }),

    getAnswerSheetsFile: builder.query<GetAnswerSheetsFileOutputType, GetAnswerSheetsFileInputType>({
      providesTags: [{ type: 'Program', id: 'ALL' }],
      query: ({ formId }) => ({
        url: `/report/answer-sheets/?form_id=${formId}`,
      }),
    }),

    getProgramMerchandisesPurchasesFile: builder.query<GetProgramMerchandisesPurchasesFileOutputType, GetProgramMerchandisesPurchasesFileInputType>({
      providesTags: [{ type: 'Program', id: 'ALL' }],
      query: ({ programSlug }) => ({
        url: `/report/program-merchandises-purchases/?program_id=${programSlug}`,
      }),
    }),

  })
});

export const {
  useLazyGetParticipantsFileQuery,
  useLazyGetAnswerSheetsFileQuery,
  useLazyGetProgramMerchandisesPurchasesFileQuery,
} = ReportSlice;
