import { AshbariaProfileType, UpdateProfileResponse } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

type UpdateProfileInput = Partial<Omit<AshbariaProfileType, 'created_at' | 'updated_at'>>;

export const ProfileSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query<AshbariaProfileType, void>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: () => ({
        url: '/profile/profile/',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<{ reward_granted: boolean }, UpdateProfileInput>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      onQueryStarted: invalidateMyTagsForTypes(['Balances']),
      query: (profileData) => ({
        url: '/profile/profile/',
        method: 'PATCH',
        body: profileData,
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = ProfileSlice;