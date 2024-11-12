import { ContentManagementServiceApi } from '../../ManageContentServiceApiSlice';
import { AnswerSheetType, AnswerType } from 'commons/types/models';

type GetAnswerSheetAnswersInputType = {
  answerSheetId: string;
}

type GetQuestionAnswersInputType = {
  questionId: string;
}

type GetQuestionAnswersOutputType = AnswerType[];

export const AnswerSheetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getAnswerSheetById: builder.query<AnswerSheetType, GetAnswerSheetAnswersInputType>({
      providesTags: ['user-profile'],
      query: ({ answerSheetId }) => ({
        url: `response/answer-sheets/${answerSheetId}/`,
      }),
    }),

    getAnswerSheetsByFormId: builder.query<AnswerSheetType[], { formId: number }>({
      providesTags: ['player'],
      query: ({ formId }) => ({
        url: `response/answer-sheets/by-form/?form_id=${formId}`,
      }),
    }),

    getAnswerSheetByPlayerId: builder.query<AnswerSheetType, { playerId: string }>({
      providesTags: ['player'],
      query: ({ playerId }) => ({
        url: `response/answer-sheets/by-player/?player_id=${playerId}`,
      }),
    }),

    getWidgetAnswers: builder.query<GetQuestionAnswersOutputType, GetQuestionAnswersInputType>({
      providesTags: ['user-profile'],
      query: ({ questionId }) => ({
        url: `response/answers/question_answers/?question=${questionId}/`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useGetAnswerSheetByIdQuery,
  useGetAnswerSheetsByFormIdQuery,
  useGetAnswerSheetByPlayerIdQuery,
  useGetWidgetAnswersQuery,
} = AnswerSheetSlice;
