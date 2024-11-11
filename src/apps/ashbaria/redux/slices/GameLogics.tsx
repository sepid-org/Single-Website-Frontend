import { CourtType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

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

    finishCourt: builder.mutation<FinishCourtOutputType, FinishCourtInputType>({
      invalidatesTags: (result, error, item) => [],
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
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
        { type: 'Balances', id: 'MY' },
      ]),
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-score/',
        params: { corresponding_fsm_id: correspondingFsmId },
      }),
    }),

    getUserLastSupportPercentageInCourt: builder.query<number, { correspondingFsmId: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        // { type: 'Balances', id: 'MY' },
      ]),
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-support-percentage/',
        params: { corresponding_fsm_id: correspondingFsmId },
      }),
    }),

    getUserLastSupportPercentageChangeInCourt: builder.query<number, { correspondingFsmId: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Balances', id: 'MY' },
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
  useFinishCourtMutation,
  useGetUserLastScoreInCourtQuery,
  useGetUserLastSupportPercentageInCourtQuery,
  useGetUserLastSupportPercentageChangeInCourtQuery,
} = GameLogicsSlice;
