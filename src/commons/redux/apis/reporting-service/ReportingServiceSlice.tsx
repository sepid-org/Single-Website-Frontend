import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CMS_URL } from 'commons/constants/Constants';

type GetParticipantsFileInputType = {
  formId: string;
}

type GetAnswerSheetsFileInputType = {
  formId?: number;
  fsmId?: number;
}

type GetProgramMerchandisesPurchasesFileInputType = {
  programSlug: string;
}

export const ReportingServiceSlice = createApi({
  reducerPath: 'excelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: CMS_URL + 'api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).account?.accessToken
      if (token) headers.set('Authorization', `JWT ${token}`)
      return headers
    },
    // IMPORTANT: return the raw fetch Response object so we can manually blob() it
    responseHandler: async (response) => {
      return response.blob();
    },
  }),

  endpoints: builder => ({

    getParticipantsFile: builder.query<Blob, GetParticipantsFileInputType>({
      query: ({ formId }) => ({
        url: `/report/participants/`,
        params: { registration_form_id: formId },
      }),
    }),

    getAnswerSheetsFile: builder.query<Blob, GetAnswerSheetsFileInputType>({
      query: ({ formId, fsmId }) => ({
        url: `/report/answer-sheets/`,
        params: { form_id: formId, fsm_id: fsmId },
      }),
    }),

    getProgramMerchandisesPurchasesFile: builder.query<Blob, GetProgramMerchandisesPurchasesFileInputType>({
      query: ({ programSlug }) => ({
        url: `/report/program-merchandises-purchases/`,
        params: { program_id: programSlug },
      }),
    }),

  })
});

export const {
  useLazyGetParticipantsFileQuery,
  useLazyGetAnswerSheetsFileQuery,
  useLazyGetProgramMerchandisesPurchasesFileQuery,
} = ReportingServiceSlice;