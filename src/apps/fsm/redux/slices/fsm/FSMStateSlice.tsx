import { FSMEdgeType, FSMStateType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
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

type EdgesOutputType = FSMEdgeType[];

type UpdatePaperOrderInputType = {
  fsmStateId: string;
  paperIds: string[];
};

type UpdatePaperOrderOutputType = {
  message: string;
};

type AddPaperToFSMStateInputType = {
  fsmStateId: string;
  paperId: string;
};

type AddPaperToFSMStateOutputType = {
  message: string;
};

type RemovePaperFromFSMStateInputType = {
  fsmStateId: string;
  paperId: string;
};

type RemovePaperFromFSMStateOutputType = {
  message: string;
};

type CreateAndAddPaperToFSMStateInputType = {
  fsmStateId: string;
};

type CreateAndAddPaperToFSMStateOutputType = void;

type DuplicateAndAddPaperToFSMStateInputType = {
  fsmStateId: string;
  paperId: string;
};

type DuplicateAndAddPaperToFSMStateOutputType = void;

export const FSMStateSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: (builder) => ({
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
    }),

    updateFSMState: builder.mutation<UpdateFSMStateOutputType, UpdateFSMStateInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state', id: result.id },
        'fsm-states',
        'player-transited-path',
      ]),
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteFSMState: builder.mutation<void, { fsmStateId: string }>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-states', 'player-transited-path']),
      query: ({ fsmStateId }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'DELETE',
      }),
    }),

    getFSMState: builder.query<GetFSMStateOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state', id: result.id },
      ]),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/`,
    }),

    getFSMStateOutwardEdges: builder.query<EdgesOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state-edges', id: item.fsmStateId },
      ]),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/outward_edges/`,
    }),

    getFSMStateInwardEdges: builder.query<EdgesOutputType, { fsmStateId: string }>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state-edges', id: item.fsmStateId },
      ]),
      query: ({ fsmStateId }) => `/fsm/state/${fsmStateId}/inward_edges/`,
    }),

    updatePaperOrder: builder.mutation<UpdatePaperOrderOutputType, UpdatePaperOrderInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state', id: item.fsmStateId },
      ]),
      query: ({ fsmStateId, paperIds }) => ({
        url: `/fsm/state/${fsmStateId}/update_paper_order/`,
        method: 'POST',
        body: { paper_ids: paperIds },
      }),
    }),

    addPaperToFSMState: builder.mutation<AddPaperToFSMStateOutputType, AddPaperToFSMStateInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state', id: item.fsmStateId },
      ]),
      query: ({ fsmStateId, paperId }) => ({
        url: `/fsm/state/${fsmStateId}/add_paper/`,
        method: 'POST',
        body: { paper_id: paperId },
      }),
    }),

    removePaperFromFSMState: builder.mutation<RemovePaperFromFSMStateOutputType, RemovePaperFromFSMStateInputType>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) => [
        { type: 'fsm-state', id: item.fsmStateId },
      ]),
      query: ({ fsmStateId, paperId }) => ({
        url: `/fsm/state/${fsmStateId}/remove_paper/`,
        method: 'POST',
        body: { paper_id: paperId },
      }),
    }),

    createAndAddPaperToFSMState: builder.mutation<CreateAndAddPaperToFSMStateOutputType, CreateAndAddPaperToFSMStateInputType>({
      invalidatesTags: (result, error, item) => [
        { type: 'fsm-state', id: item.fsmStateId },
      ],
      query: ({ fsmStateId }) => ({
        url: `/fsm/state/${fsmStateId}/create_and_add_paper/`,
        method: 'POST',
      }),
    }),

    duplicateAndAddPaperToFSMState: builder.mutation<DuplicateAndAddPaperToFSMStateOutputType, DuplicateAndAddPaperToFSMStateInputType>({
      invalidatesTags: (result, error, item) => [
        { type: 'fsm-state', id: item.fsmStateId },
      ],
      query: ({ fsmStateId, paperId }) => ({
        url: `/fsm/state/${fsmStateId}/duplicate_and_add_paper/`,
        method: 'POST',
        body: {
          paper_id: paperId,
        }
      }),
    }),
  }),
});

export const {
  useCreateFSMStateMutation,
  useUpdateFSMStateMutation,
  useGetFSMStateQuery,
  useDeleteFSMStateMutation,
  useGetFSMStateOutwardEdgesQuery,
  useGetFSMStateInwardEdgesQuery,
  useUpdatePaperOrderMutation,
  useAddPaperToFSMStateMutation,
  useRemovePaperFromFSMStateMutation,
  useCreateAndAddPaperToFSMStateMutation,
  useDuplicateAndAddPaperToFSMStateMutation,
} = FSMStateSlice;