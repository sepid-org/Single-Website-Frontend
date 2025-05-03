import { FSMEdgeType, FSMPublicListType, FSMStateType, FSMType, FSMFullStatesType, FSMFullPapersType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';

type UpdateFSMInputType = {
  fsmId: number;
} & FSMType;

type UpdateFSMOutputType = {

}

type CreateFSMInputType = {
  program: number;
} & Partial<FSMType>;

type CreateFSMOutputType = {

}

type GetFSMsInputType = {
  programSlug: string;
  pageNumber: number;
};

type GetFSMsOutputType = {
  fsms: FSMPublicListType[];
  count: number;
}

type GetFSMStatesOutputType = FSMStateType[];

type GetFSMEdgesOutputType = FSMEdgeType[];



export const FSMSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSM: builder.mutation<CreateFSMOutputType, CreateFSMInputType>({
      invalidatesTags: [{ type: 'FSM', id: 'ALL' }],
      query: ({ ...body }) => ({
        url: `/fsm/fsm/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMOutputType => {
        return response;
      },
    }),

    updateFSM: builder.mutation<UpdateFSMOutputType, UpdateFSMInputType>({
      invalidatesTags: ['FSM', { type: 'FSM', id: 'ALL' }],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMOutputType => {
        return response;
      },
    }),

    getFSM: builder.query<FSMType, { fsmId: number }>({
      providesTags: ['FSM'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/`,
    }),

    getFSMAllStates: builder.query<FSMFullStatesType, { fsmId: number }>({
      providesTags: ['FSM'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/all-states/`,
    }),

    getFSMAllPapers: builder.query<FSMFullPapersType, { fsmId: number }>({
      providesTags: ['FSM'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/all-papers/`,
    }),

    getFSMs: builder.query<GetFSMsOutputType, GetFSMsInputType>({
      providesTags: [{ type: 'FSM', id: 'ALL' }],
      query: ({ programSlug, pageNumber = 1 }) => `fsm/fsm/?program=${programSlug}&page=${pageNumber}`,
      transformResponse: (response: any): GetFSMsOutputType => {
        return {
          fsms: response.results,
          count: response.count,
        };
      },
    }),

    getFSMStates: builder.query<GetFSMStatesOutputType, { fsmId: number }>({
      providesTags: ['fsm-states'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/states/`,
      transformResponse: (response: any): GetFSMStatesOutputType => {
        return response;
      },
    }),

    getFSMEdges: builder.query<GetFSMEdgesOutputType, { fsmId: number }>({
      providesTags: ['fsm-edges'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/get_edges/`,
      transformResponse: (response: any): GetFSMEdgesOutputType => {
        return response;
      },
    }),

    softDeleteFSM: builder.mutation<any, { fsmId: number }>({
      invalidatesTags: [{ type: 'FSM', id: 'ALL' }],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/delete/`
    }),

    setFSMFirstState: builder.mutation<any, { fsmId: number; fsmStateId: string }>({
      invalidatesTags: ['FSM', 'fsm-states'],
      query: ({ fsmId, fsmStateId }) => ({
        url: `/fsm/fsm/${fsmId}/first_state/`,
        method: 'POST',
        body: {
          state: fsmStateId,
        },
      }),
    }),
  })
});

export const {
  useUpdateFSMMutation,
  useCreateFSMMutation,
  useGetFSMQuery,
  useGetFSMsQuery,
  useGetFSMAllStatesQuery,
  useGetFSMAllPapersQuery,
  useSoftDeleteFSMMutation,
  useGetFSMStatesQuery,
  useGetFSMEdgesQuery,
  useSetFSMFirstStateMutation,
} = FSMSlice;
