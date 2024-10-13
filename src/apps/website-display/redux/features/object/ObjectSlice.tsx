import { PositionType } from "commons/types/widgets/widget";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";


interface UpdatePositionsRequest {
  positions: PositionType[];
}

export const PositionSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useUpdatePositionsMutation,
} = PositionSlice;
