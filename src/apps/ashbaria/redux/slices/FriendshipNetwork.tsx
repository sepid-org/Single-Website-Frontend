import { CodeType, CompletedMissionType, FollowType, FriendshipNetworkType, MissionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';

type GetMyFriendshipNetworkOutputType = {
  network: FriendshipNetworkType;
  code: CodeType;
}

export const FriendshipNetworkSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getMyFriendshipNetwork: builder.query<GetMyFriendshipNetworkOutputType, void>({
      providesTags: [{ type: 'Network', id: 'MY' }],
      query: () => '/friendship-network/my-network/',
    }),

    getMissions: builder.query<MissionType[], void>({
      providesTags: [{ type: 'Missions', id: 'ALL' }],
      query: () => '/friendship-network/missions/',
    }),

    follow: builder.mutation<FollowType & { created: boolean }, { code: string }>({
      invalidatesTags: [{ type: 'Network', id: 'MY' }],
      onQueryStarted: createInvalidationCallback([
        { type: 'rank', id: 'MY' },
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ code }) => ({
        url: '/friendship-network/follow/',
        method: 'POST',
        body: {
          code,
        }
      }),
    }),

    getMyCompletedMissions: builder.query<MissionType[], void>({
      providesTags: [{ type: 'Missions', id: 'MY-COMPLETED-MISSIONS' }],
      query: () => '/friendship-network/my-completed-missions/',
    }),

    completeMission: builder.mutation<CompletedMissionType, { missionId: string }>({
      invalidatesTags: [{ type: 'Missions', id: 'MY-COMPLETED-MISSIONS' }],
      onQueryStarted: createInvalidationCallback([
        { type: 'rank', id: 'MY' },
        { type: 'balances', id: 'MY' },
      ]),
      query: ({ missionId }) => ({
        url: '/friendship-network/complete-mission/',
        method: 'POST',
        body: {
          mission: missionId,
        }
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetMyFriendshipNetworkQuery,
  useGetMissionsQuery,
  useFollowMutation,
  useGetMyCompletedMissionsQuery,
  useCompleteMissionMutation,
} = FriendshipNetworkSlice;
