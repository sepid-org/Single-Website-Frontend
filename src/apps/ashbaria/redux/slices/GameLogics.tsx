import { CourtType, DocumentType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';

type FinishCourtInputType = {
  fsmId: string;
}

type FinishCourtOutputType = {

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

  }),
  overrideExisting: false,
});

export const {
  useGetCourtsQuery,
  useGetDocumentsQuery,
  useFinishCourtMutation,
} = GameLogicsSlice;
