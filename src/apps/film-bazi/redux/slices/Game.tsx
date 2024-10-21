import { FilmType, GameType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';


export const GameSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getGames: builder.query<GameType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-game', id: 'LIST' }
      ]),
      query: () => `games/games/`,
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetGamesQuery,
} = GameSlice;
