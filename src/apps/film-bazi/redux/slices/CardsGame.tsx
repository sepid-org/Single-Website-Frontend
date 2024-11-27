import { CardType, MissionType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

export const CardsGameSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getMission: builder.query<MissionType, void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'CardsGame-Mission' }
      ]),
      query: () => `cards-game/missions/`,
    }),

    getCards: builder.query<CardType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'CardsGame-Card', id: 'LIST' }
      ]),
      query: () => `cards-game/cards/`,
    }),

    attemptToAnswer: builder.mutation<any, { answer: Array<number> }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => ['CardsGame-Mission']),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ answer }) => ({
        url: `cards-game/attempts/`,
        method: 'POST',
        body: {
          answer,
        }
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetMissionQuery,
  useGetCardsQuery,
  useAttemptToAnswerMutation,
} = CardsGameSlice;
