import { PositionType } from "commons/types/widgets/widget";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";
import { ObjectType } from "commons/types/models";


interface UpdatePositionsRequest {
  positions: PositionType[];
}

export const PositionSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getObjectsByPaper: builder.query<ObjectType[], { paperId: string }>({
      query: ({ paperId }) => `/fsm/objects/by-paper/${paperId}/`,
      providesTags: (result, error, { paperId }) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Position' as const, id })),
            { type: 'Position' as const, id: 'LIST' },
          ]
          : [{ type: 'Position' as const, id: 'LIST' }],
    }),

    updatePositions: builder.mutation<void, UpdatePositionsRequest>({
      invalidatesTags: [{ type: 'Position', id: 'LIST' }, 'paper'],
      query: ({ positions }) => ({
        url: '/fsm/objects/update-positions/',
        method: 'POST',
        body: { positions },
      }),
    }),
  }),
});

export const {
  useGetObjectsByPaperQuery,
  useUpdatePositionsMutation,
} = PositionSlice;
