import { CourtType, DocumentType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';

type FinishCourtInputType = {
  fsmId: number;
}

type FinishCourtOutputType = {

}

export const GameLogicsSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getCourts: builder.query<CourtType[], void>({
      providesTags: ['Court'],
      query: () => ({
        url: '/game-logic/courts/',
        method: 'GET',
      }),
    }),

    getDocuments: builder.query<DocumentType[], void>({
      providesTags: ['Document'],
      query: () => ({
        url: '/game-logic/documents/',
        method: 'GET',
      }),
    }),

    finishCourt: builder.mutation<FinishCourtOutputType, FinishCourtInputType>({
      invalidatesTags: (result, error, item) => [],
      onQueryStarted: createInvalidationCallback([
        { type: 'rank', id: 'MY' },
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ fsmId }) => ({
        url: '/game-logic/finish-court/',
        method: 'POST',
        body: {
          fsm_id: fsmId,
        },
      }),
    }),

    getUserLastScoreInCourt: builder.query<number, { correspondingFsmId: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-score/',
        params: { corresponding_fsm_id: correspondingFsmId },
      }),
    }),

    getUserLastSupportPercentageInCourt: builder.query<number, { correspondingFsmId: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-support-percentage/',
        params: { corresponding_fsm_id: correspondingFsmId },
      }),
    }),

    getUserLastSupportPercentageChangeInCourt: builder.query<number, { correspondingFsmId: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-support-percentage-change/',
        params: { corresponding_fsm_id: correspondingFsmId },
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetCourtsQuery,
  useGetDocumentsQuery,
  useFinishCourtMutation,
  useGetUserLastScoreInCourtQuery,
  useGetUserLastSupportPercentageInCourtQuery,
  useGetUserLastSupportPercentageChangeInCourtQuery,
} = GameLogicsSlice;
