import { FilmType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';


export const FilmsSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getFilms: builder.query<FilmType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-film', id: 'LIST' }
      ]),
      query: () => `films/films/`,
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetFilmsQuery,
} = FilmsSlice;
