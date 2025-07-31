import { ProgramProfileType } from 'apps/program/types/profile';
import { AshbariaApi } from '../AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

type UpdateProfileInput = Partial<Omit<ProgramProfileType, 'created_at' | 'updated_at'>>;

export const ProfileSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getProgramProfile: builder.query<ProgramProfileType, void>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: () => ({
        url: '/profile/profile/',
        method: 'GET',
      }),
    }),

    updateProgramProfile: builder.mutation<{ reward_granted: boolean }, UpdateProfileInput>({
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
  useGetProgramProfileQuery,
  useUpdateProgramProfileMutation,
} = ProfileSlice;