import { ProfileType, UpdateProfileResponse } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';

type UpdateProfileInput = Partial<Omit<ProfileType, 'created_at' | 'updated_at'>>;

export const ProfileSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query<ProfileType, void>({
      providesTags: ['Profile'],
      query: () => ({
        url: '/profile/profile/',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<{ reward_granted: boolean }, UpdateProfileInput>({
      invalidatesTags: ['Profile'],
      onQueryStarted: createInvalidationCallback([
        { type: 'rank', id: 'MY' },
        { type: 'balances', id: 'MY' },
      ]),
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