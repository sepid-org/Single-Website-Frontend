import { FollowType, MembershipType, NetworkType } from 'apps/ashbaria/types';
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';



export const NetworkSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getNetwork: builder.query<NetworkType, { id: number; }>({
      providesTags: (result, error, { id }) => [{ type: 'Network', id }],
      query: ({ id }) => `/friendship-network/networks/${id}/`,
    }),

    getMyMembership: builder.query<MembershipType, { networkId: number }>({
      providesTags: [{ type: 'Network', id: 'MY' }],
      query: ({ networkId }) =>
      ({
        url: `/friendship-network/networks/${networkId}/my-membership/`,
        params: {
          network: networkId,
        },
      }),
    }),

    follow: builder.mutation<FollowType & { created: boolean }, { code: string; networkId: number; }>({
      invalidatesTags: [{ type: 'Network', id: 'MY' }],
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: ({ code, networkId }) => ({
        url: '/friendship-network/follows/',
        method: 'POST',
        body: {
          code,
          network: networkId,
        }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNetworkQuery,
  useGetMyMembershipQuery,
  useFollowMutation,
} = NetworkSlice;