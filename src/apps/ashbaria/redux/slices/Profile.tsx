import { ProfileType, UpdateProfileResponse } from 'apps/ashbaria/types';
import { AshbariaApi } from '../AshbariaApi';

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

    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileInput>({
      invalidatesTags: ['Profile'],
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