import { ManageContentServiceApi } from "../ManageContentServiceApiSlice";

export const PositionSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getPositionsByPaper: builder.query({
      query: ({ paperId }) => `/fsm/positions/by-paper/${paperId}/`,
      providesTags: (result, error, paperId) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Position', id })),
            { type: 'Position', id: 'LIST' },
          ]
          : [{ type: 'Position', id: 'LIST' }],
    }),

    savePositions: builder.mutation({
      query: ({ positions }) => ({
        url: '/fsm/positions/save-positions/',
        method: 'POST',
        body: { positions },
      }),
      invalidatesTags: [{ type: 'Position', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPositionsByPaperQuery,
  useSavePositionsMutation,
} = PositionSlice;