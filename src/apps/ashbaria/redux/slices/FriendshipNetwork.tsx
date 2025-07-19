import { CodeType, CompletedMissionType, FollowType, FriendshipNetworkType, MissionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

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
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ code }) => ({
        url: '/friendship-network/follow/',
        method: 'POST',
        body: {
          code,
        }
      }),
    }),

    getMyCompletedMissions: builder.query<MissionType[], void>({
      providesTags: [{ type: 'Missions', id: 'MY' }],
      query: () => '/friendship-network/my-completed-missions/',
    }),

    completeMission: builder.mutation<CompletedMissionType, { missionId: string }>({
      invalidatesTags: [{ type: 'Missions', id: 'MY' }],
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ missionId }) => ({
        url: '/friendship-network/complete-mission/',
        method: 'POST',
        body: {
          mission: missionId,
        }
      }),
    }),

    submitRewardCode: builder.mutation<void, { rewardCode: string }>({
      invalidatesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'RewardCode', id: 'MY' }]
      ),
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ rewardCode }) => ({
        url: '/friendship-network/reward-code/submit/',
        method: 'POST',
        body: {
          code: rewardCode,
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
  useSubmitRewardCodeMutation,
} = FriendshipNetworkSlice;