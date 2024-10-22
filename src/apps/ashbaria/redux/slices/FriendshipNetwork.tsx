import { AshbariaApi } from '../AshbariaApi';

type Network = {
  beFollowedRewardScore: number;
  // Add other network properties as needed
}

type Mission = {
  title: string;
  requiredInvitations: number;
  rewardScore: number;
}

type Follow = {
  code: string;
}

type MissionProgress = {
  invitationsMade: number;
  missionProgress: Array<{
    title: string;
    requiredInvitations: number;
    rewardScore: number;
    invitationsMade: number;
    completed: boolean;
  }>;
}

type CreateCodeResponse = {
  userUuid: string;
  code: string;
}

export const FriendshipNetworkSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get my code info
    getMyCodeInfo: builder.query<Network, void>({
      query: () => ({
        url: '/friendship-network/my-code-info/',
        method: 'GET',
      }),
      providesTags: ['Network'],
    }),

    // Get mission list
    getMissions: builder.query<Mission[], void>({
      query: () => ({
        url: '/friendship-network/missions/',
        method: 'GET',
      }),
      providesTags: ['Missions'],
    }),

    // Register follow
    registerFollow: builder.mutation<{ detail: string }, { code: string }>({
      query: (body) => ({
        url: '/friendship-network/register-follow/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Network', 'MissionProgress'],
    }),

    // Get mission progress
    getMissionProgress: builder.query<MissionProgress, void>({
      query: () => ({
        url: '/friendship-network/my-mission-progress/',
        method: 'GET',
      }),
      providesTags: ['MissionProgress'],
    }),

    // Create code
    createCode: builder.mutation<CreateCodeResponse, void>({
      query: () => ({
        url: '/friendship-network/create-code/',
        method: 'GET',  // Note: This is a GET request that creates a resource
      }),
      invalidatesTags: ['Network'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyCodeInfoQuery,
  useGetMissionsQuery,
  useRegisterFollowMutation,
  useGetMissionProgressQuery,
  useCreateCodeMutation,
} = FriendshipNetworkSlice;
