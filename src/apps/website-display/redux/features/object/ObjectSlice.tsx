import { PositionType } from "commons/types/object/object";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";
import tagGenerationWithErrorCheck from "commons/redux/utilities/tagGenerationWithErrorCheck";


interface UpdatePositionsRequest {
  paperId?: string;
  positions: PositionType[];
}

export const PositionSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePositions: builder.mutation<void, UpdatePositionsRequest>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'paper', id: item.paperId },
      ]),
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
