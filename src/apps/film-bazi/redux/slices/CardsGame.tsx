import { CardType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

export const CardsGameSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getCards: builder.query<CardType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-card', id: 'LIST' }
      ]),
      query: () => `cards-game/cards/`,
    }),

    attemptToAnswer: builder.mutation<any, { answer: Array<number> }>({
      query: ({ answer }) => ({
        url: `cards-game/attempt/`,
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
  useGetCardsQuery,
  useAttemptToAnswerMutation,
} = CardsGameSlice;
