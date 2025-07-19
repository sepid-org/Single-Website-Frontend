import { FilmType, GameType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';


export const GameSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getGame: builder.query<GameType, { id: number }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Game', id: item.id }
      ]),
      query: ({ id }) => `games/games/${id}/`,
    }),

    getGames: builder.query<GameType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Game', id: 'LIST' }
      ]),
      query: () => `games/games/`,
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetGameQuery,
  useGetGamesQuery,
} = GameSlice;
