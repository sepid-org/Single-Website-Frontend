import { SeatSelectionType, SeatType } from 'apps/film-bazi/types';
import { FilmbaziApi } from '../FilmbaziApi';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';

type FinishCourtInputType = {
  fsmId: number;
}

type FinishCourtOutputType = {

}

export const CinemaGameSlice = FilmbaziApi.injectEndpoints({
  endpoints: (builder) => ({

    getSeat: builder.query<SeatType, { seatName: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-seat', id: result.name }
      ]),
      query: ({ seatName }) => `cinema-game/seat/?seat_name=${seatName}`,
    }),

    getSeatSelections: builder.query<SeatSelectionType[], void>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-seat-selection', id: 'LIST' }
      ]),
      query: () => `cinema-game/seat-selections/`,
    }),

    selectSeat: builder.mutation<SeatType, { seatName: string }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'filmbazi-seat-selection', id: 'LIST' },
      ]),
      onQueryStarted: createInvalidationCallback([
        { type: 'Balances', id: 'MY' },
      ]),
      query: ({ seatName }) => ({
        url: `cinema-game/select-seat/?seat_name=${seatName}`,
        method: 'GET',
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetSeatQuery,
  useGetSeatSelectionsQuery,
  useSelectSeatMutation,
} = CinemaGameSlice;
