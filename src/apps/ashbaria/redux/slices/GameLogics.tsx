import { CourtType, DocumentType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';

type FinishCourtInputType = {
  fsmId: string;
}

type FinishCourtOutputType = {

}

type GetUserLastResultInFSMOutputType = {
  support_change: number;
  support_percentage: number;
  score: number
}

export const GameLogicsSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getCourts: builder.query<CourtType[], void>({
      providesTags: ['Court'],
      query: () => ({
        url: '/game-logic/documents/',
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
      query: ({ fsmId }) => ({
        url: '/game-logic/finish-court/',
        method: 'POST',
        body: {
          fsm_id: fsmId,
        },
      }),
    }),

    getUserLastResultInFSM: builder.query<GetUserLastResultInFSMOutputType, { correspondingFsmId: string }>({
      providesTags: ['Balances'],
      query: ({ correspondingFsmId }) => ({
        url: '/game-logic/last-result-in-court/',
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
  useGetUserLastResultInFSMQuery,
} = GameLogicsSlice;
