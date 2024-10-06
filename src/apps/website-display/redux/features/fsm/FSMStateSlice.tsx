import { EdgeType, FSMStateType } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type UpdateFSMStateInputType = {
  fsmStateId: string;
} & Partial<FSMStateType>;

type UpdateFSMStateOutputType = Partial<FSMStateType>;

type CreateFSMStateInputType = {
  fsmId: string;
} & any;

type CreateFSMStateOutputType = {

}

type GetFSMStateOutputType = FSMStateType;

type EdgesOutputType = EdgeType[];


export const FSMStateSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSMState: builder.mutation<CreateFSMStateOutputType, CreateFSMStateInputType>({
      invalidatesTags: ['fsm-states'],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/state/`,
        method: 'POST',
        body: {
          ...body,
          fsm: fsmId,
        },
      }),
      transformResponse: (response: any): CreateFSMStateOutputType => {
        return response;
      },
    }),

    updateFSMState: builder.mutation<UpdateFSMStateOutputType, UpdateFSMStateInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [
          { type: 'fsm-state', id: result.id },
          'fsm-states',
          'player-transited-path',
        ]
      ),
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMStateOutputType => {
        return response;
      },
    }),

    deleteFSMState: builder.mutation<any, { fsmStateId: string }>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-states', 'player-transited-path']),
      query: ({ fsmStateId }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'DELETE',
      }),
    }),

    getFSMState: builder.query<GetFSMStateOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'fsm-state', id: result.id }]
      ),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/`,
      transformResponse: (response: any): GetFSMStateOutputType => {
        return response;
      },
    }),

    getFSMStateOutwardEdges: builder.query<EdgesOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'fsm-state-edges', id: result.id }]
      ),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/outward_edges/`,
    }),

    getFSMStateInwardEdges: builder.query<EdgesOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'fsm-state-edges', id: result.id }]
      ),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/inward_edges/`,
    }),
  })
});

export const {
  useCreateFSMStateMutation,
  useUpdateFSMStateMutation,
  useGetFSMStateQuery,
  useDeleteFSMStateMutation,
  useGetFSMStateOutwardEdgesQuery,
  useGetFSMStateInwardEdgesQuery,
} = FSMStateSlice;
