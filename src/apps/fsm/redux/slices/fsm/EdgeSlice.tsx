import { EdgeType, FSMEdgeType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type UpdateFSMEdgeInputType = {
  fsmEdgeId: string;
} & Partial<FSMEdgeType>;

type UpdateFSMEdgeOutputType = FSMEdgeType;

type CreateFSMEdgeInputType = {
  tail: string;
  head: string;
  is_visible: boolean;
  is_back_enabled: boolean;
};

type CreateFSMEdgeOutputType = {

}

type GetEdgeInputType = {
  edgeId: string;
}

type GetEdgeOutputType = EdgeType;


export const EdgeSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getFSMEdge: builder.query<GetEdgeOutputType, GetEdgeInputType>({
      providesTags: (result, error, item) => [{ type: 'fsm-edge', id: result.id }],
      query: ({ edgeId }) => `fsm/edge/${edgeId}/`,
    }),

    createFSMEdge: builder.mutation<CreateFSMEdgeOutputType, CreateFSMEdgeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [
          { type: 'fsm-edge', id: result.id },
          'fsm-edges',
          { type: 'fsm-state-edges', id: item.tail },
          { type: 'fsm-state-edges', id: item.head },
        ]
      ),
      query: ({ ...body }) => ({
        url: `/fsm/edge/`,
        method: 'POST',
        body,
      }),
    }),

    updateFSMEdge: builder.mutation<UpdateFSMEdgeOutputType, UpdateFSMEdgeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-edges', 'player-transited-path', 'fsm-state-edges']),
      query: ({ fsmEdgeId, ...body }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteFSMEdge: builder.mutation<any, { fsmEdgeId: string }>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-edges', 'player-transited-path', 'fsm-state-edges']),
      query: ({ fsmEdgeId }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useGetFSMEdgeQuery,
  useCreateFSMEdgeMutation,
  useUpdateFSMEdgeMutation,
  useDeleteFSMEdgeMutation,
} = EdgeSlice;
