import { FSMEdgeType } from 'commons/types/models';
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

export const EdgeSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSMEdge: builder.mutation<CreateFSMEdgeOutputType, CreateFSMEdgeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-edges', 'fsm-state']),
      query: ({ ...body }) => ({
        url: `/fsm/edge/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMEdgeOutputType => {
        return response;
      },
    }),

    updateFSMEdge: builder.mutation<UpdateFSMEdgeOutputType, UpdateFSMEdgeInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-edges', 'player-transited-path', 'fsm-state']),
      query: ({ fsmEdgeId, ...body }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMEdgeOutputType => {
        return response;
      },
    }),

    deleteFSMEdge: builder.mutation<any, { fsmEdgeId: string }>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-edges', 'player-transited-path', 'fsm-state']),
      query: ({ fsmEdgeId }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useCreateFSMEdgeMutation,
  useUpdateFSMEdgeMutation,
  useDeleteFSMEdgeMutation,
} = EdgeSlice;
