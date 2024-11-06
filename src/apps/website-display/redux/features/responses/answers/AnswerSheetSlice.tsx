import { ContentManagementServiceApi } from '../../ManageContentServiceApiSlice';
import { AnswerSheetType, AnswerType } from 'commons/types/models';

type GetAnswerSheetAnswersInputType = {
  answerSheetId: string;
}

type GetAnswerSheetAnswersOutputType = AnswerSheetType;

type GetQuestionAnswersInputType = {
  questionId: string;
}

type GetQuestionAnswersOutputType = AnswerType[];

export const AnswerSheetSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getAnswerSheet: builder.query<GetAnswerSheetAnswersOutputType, GetAnswerSheetAnswersInputType>({
      providesTags: ['user-profile'],
      query: ({ answerSheetId }) => ({
        url: `response/answer-sheets/${answerSheetId}/`,
      }),
    }),

    getAnswerSheetByPlayerId: builder.query<GetAnswerSheetAnswersOutputType, { playerId: string }>({
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
  useGetAnswerSheetQuery,
  useGetAnswerSheetByPlayerIdQuery,
  useGetWidgetAnswersQuery,
} = AnswerSheetSlice;
