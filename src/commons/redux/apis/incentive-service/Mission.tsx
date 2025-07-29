import { CompletedMissionType, MissionType } from 'apps/ashbaria/types';
import { AshbariaApi } from 'apps/ashbaria/redux/AshbariaApi';
import { invalidateMyTagsForTypes } from 'commons/redux/utilities/tagInvalidation';

export const MissionSlice = AshbariaApi.injectEndpoints({
  endpoints: (builder) => ({

    getMissions: builder.query<MissionType[], void>({
      providesTags: [{ type: 'Missions', id: 'ALL' }],
      query: () => '/friendship-network/missions/',
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

  }),
});

export const {
  useGetMissionsQuery,
  useGetMyCompletedMissionsQuery,
  useCompleteMissionMutation,
} = MissionSlice;