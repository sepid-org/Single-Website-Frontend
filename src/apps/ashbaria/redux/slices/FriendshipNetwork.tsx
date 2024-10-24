import { FollowType, FriendshipNetworkType, MissionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';

export const FriendshipNetworkSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getMyFriendshipNetwork: builder.query<FriendshipNetworkType, void>({
      providesTags: [{ type: 'Network', id: 'MY' }],
      query: () => '/friendship-network/friendship-network/my_network/',
    }),

    getMissions: builder.query<MissionType[], void>({
      query: () => '/friendship-network/missions/',
      providesTags: [{ type: 'Missions', id: 'ALL' }],
    }),

    follow: builder.mutation<FollowType & { created: boolean }, { code: string }>({
      invalidatesTags: [{ type: 'Missions', id: 'MY' }],
      query: ({ code }) => ({
        url: '/friendship-network/follows/follow/',
        method: 'POST',
        body: {
          code,
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
} = FriendshipNetworkSlice;
