import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";

export const PositionSlice = ContentManagementServiceApi.injectEndpoints({
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

    updatePositions: builder.mutation({
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
  useUpdatePositionsMutation,
} = PositionSlice;