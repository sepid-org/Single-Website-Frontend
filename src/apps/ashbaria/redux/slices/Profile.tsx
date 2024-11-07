import { ProfileType, UpdateProfileResponse } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

type UpdateProfileInput = Partial<Omit<ProfileType, 'created_at' | 'updated_at'>>;

export const ProfileSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query<ProfileType, void>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: () => ({
        url: '/profile/profile/',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<{ reward_granted: boolean }, UpdateProfileInput>({
      invalidatesTags: ['Profile'],
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