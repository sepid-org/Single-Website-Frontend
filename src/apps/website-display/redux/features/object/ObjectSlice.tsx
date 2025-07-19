import { PositionType } from "commons/types/object/object";
import { ContentManagementServiceApi } from "../ManageContentServiceApiSlice";
import tagGenerationWithErrorCheck from "commons/redux/utilities/tagGenerationWithErrorCheck";
import { AttributeType } from "commons/types/object/attribute";


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

    getObjectAttributes: builder.query<AttributeType[], { objectId?: number }>({
      query: ({ objectId }) => ({
        url: `/fsm/objects/${objectId}/attributes/`,
        params: {
          object_id: objectId,
        },
      }),
      providesTags: (result, error, item) => [{ type: 'ObjectAttributes', id: item.objectId }]
    }),
  }),
});

export const {
  useUpdatePositionsMutation,
  useGetObjectAttributesQuery,
} = PositionSlice;
