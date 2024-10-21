import { AshbariaApi } from '../AshbariaApi';

type FinishCourtInputType = {
  fsmId: string;
}

type FinishCourtOutputType = {

}

export const GameLogicsSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    finishCourt: builder.mutation<FinishCourtOutputType, FinishCourtInputType>({
      invalidatesTags: (result, error, item) => [],
      query: ({ fsmId }) => ({
        url: '/game-logic/finish-court/',
        method: 'POST',
        body: {
          fsm_id: fsmId,
        },
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useFinishCourtMutation,
} = GameLogicsSlice;
