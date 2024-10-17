import { FSMEdgeType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type UpdateFSMEdgeInputType = {
  fsmEdgeId: string;
} & Partial<FSMEdgeType>;

type UpdateFSMEdgeOutputType = FSMEdgeType;

type CreateFSMEdgeInputType = Partial<FSMEdgeType>

type CreateFSMEdgeOutputType = FSMEdgeType;

type GetEdgeInputType = {
  edgeId: string;
}

type GetEdgeOutputType = FSMEdgeType;


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
          'fsm-state-edges',
        ]
      ),
      query: ({ ...body }) => ({
        url: `/fsm/edge/`,
        method: 'POST',
        body,
      }),
    }),

    updateFSMEdge: builder.mutation<UpdateFSMEdgeOutputType, UpdateFSMEdgeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [
          { type: 'fsm-edge', id: result.id },
          'fsm-edges',
          'player-transited-path',
          'fsm-state-edges',
        ]
      ),
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
