import { PlayerType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';

type TransitToStateInputType = {
  stateId: string;
}

type TransitToStateOutputType = void;

type GoBackwardInputType = {
  playerId: string;
}

type GoBackwardOutputType = void;

type MentorMoveForwardInputType = {
  edgeId: string;
}

type MentorMoveForwardOutputType = void;

type MentorMoveBackwardInputType = {
  playerId: string;
}

type MentorMoveBackwardOutputType = void;

type GetPlayerInputType = {
  playerId: string;
}

type GetPlayerOutputType = PlayerType;

type EnterFSMInputType = {
  fsmId: number;
  password?: string;
}

type EnterFSMOutputType = PlayerType;

type GetMyPlayerInputType = {
  fsmId: number;
}

type GetMyPlayerOutputType = PlayerType;

type FinishFSMInputType = {
  playerId: string;
}

type FinishFSMOutputType = void;

export const PlayerSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    transitToState: builder.mutation<TransitToStateOutputType, TransitToStateInputType>({
      invalidatesTags: ['player'],
      query: ({ stateId }) => ({
        url: `/fsm/player/transit-to-state/`,
        method: 'POST',
        body: {
          state: stateId,
        },
      }),
    }),

    goBackward: builder.mutation<GoBackwardOutputType, GoBackwardInputType>({
      invalidatesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/go_backward/`,
        method: 'POST',
      }),
    }),

    mentorMoveForward: builder.mutation<MentorMoveForwardOutputType, MentorMoveForwardInputType>({
      invalidatesTags: ['player'],
      query: ({ edgeId }) => ({
        url: `/fsm/edge/${edgeId}/mentor_move_forward/`,
        method: 'POST',
      }),
    }),

    mentorMoveBackward: builder.mutation<MentorMoveBackwardOutputType, MentorMoveBackwardInputType>({
      invalidatesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/mentor_move_backward/`,
        method: 'POST',
      }),
    }),

    getPlayer: builder.query<GetPlayerOutputType, GetPlayerInputType>({
      providesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/`,
      }),
    }),

    getMyPlayer: builder.query<GetMyPlayerOutputType, GetMyPlayerInputType>({
      providesTags: ['player'],
      query: ({ fsmId }) => ({
        url: `/fsm/fsm/${fsmId}/current-user-player/`,
        method: 'GET',
      }),
    }),

    enterFSM: builder.mutation<EnterFSMOutputType, EnterFSMInputType>({
      invalidatesTags: ['player', { type: 'FSM', id: 'MY' }],
      query: ({ fsmId, password }) => ({
        url: `/fsm/fsm/${fsmId}/enter_fsm/`,
        method: 'POST',
        body: {
          password,
        }
      }),
    }),

    finishFSM: builder.mutation<FinishFSMOutputType, FinishFSMInputType>({
      invalidatesTags: ['player', { type: 'FSM', id: 'MY' }],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/finish-fsm/`,
        method: 'GET',
      }),
    }),

    getPlayerPerformance: builder.query<object, { playerId: number; }>({
      providesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/performance/`,
      }),
    }),

  })
});

export const {
  useGoBackwardMutation,
  useMentorMoveForwardMutation,
  useMentorMoveBackwardMutation,
  useGetPlayerQuery,
  useGetMyPlayerQuery,
  useEnterFSMMutation,
  useTransitToStateMutation,
  useFinishFSMMutation,
  useGetPlayerPerformanceQuery,
} = PlayerSlice;
