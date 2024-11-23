import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';


export const CapitalSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getCapital: builder.query<number, void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'Capital', id: 'MY' }
      ]),
      query: () => `/capital/capital/`,
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetCapitalQuery,
} = CapitalSlice;
