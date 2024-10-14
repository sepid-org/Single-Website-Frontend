import { PositionType } from "commons/types/widgets/widget";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";


interface UpdatePositionsRequest {
  paperId: string;
  positions: PositionType[];
}

export const PositionSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePositions: builder.mutation<void, UpdatePositionsRequest>({
      invalidatesTags: (result, error, item) => [
        { type: 'Position', id: 'LIST' },
        { type: 'paper', id: item.paperId }
      ],
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
