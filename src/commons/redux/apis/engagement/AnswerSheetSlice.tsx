import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
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
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ answerSheetId }) => ({
        url: `/engagement/answer-sheets/${answerSheetId}/`,
      }),
    }),

    getAnswerSheetByPlayerId: builder.query<GetAnswerSheetAnswersOutputType, { playerId: string }>({
      providesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/engagement/answer-sheets/by-player/?player_id=${playerId}`,
      }),
    }),
  })
});

export const {
  useGetAnswerSheetQuery,
  useGetAnswerSheetByPlayerIdQuery,
} = AnswerSheetSlice;
