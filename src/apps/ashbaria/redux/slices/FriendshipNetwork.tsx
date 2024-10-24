import { CodeType, FollowType, FriendshipNetworkType, MissionType } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';

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
      query: () => '/friendship-network/missions/',
      providesTags: [{ type: 'Missions', id: 'ALL' }],
    }),

    follow: builder.mutation<FollowType & { created: boolean }, { code: string }>({
      invalidatesTags: [{ type: 'Missions', id: 'MY' }],
      query: ({ code }) => ({
        url: '/friendship-network/follow/',
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
