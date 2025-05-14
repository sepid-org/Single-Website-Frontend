import { MeetingType } from 'apps/program/template/types';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';


export interface CreateMeetingDto {
  meeting_id: string;
  title: string;
  description?: string;
  program: number;
  start_time: string;
  end_time: string;
  location_type?: 'online' | 'physical' | 'hybrid';
}

export interface UpdateMeetingDto {
  title?: string;
  description?: string;
  program?: number;
  start_time?: string;
  end_time?: string;
  status?: 'scheduled' | 'ongoing' | 'ended' | 'canceled';
  location_type?: 'online' | 'physical' | 'hybrid';
  recording_url?: string;
}

export interface JoinResponse {
  join_url: string;
}

type GetProgramMeetingsOutputType = {
  results: MeetingType[];
  count: number;
}

export const MeetingSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createMeeting: builder.mutation<MeetingType, CreateMeetingDto>({
      query: newMeeting => ({
        url: `/meeting/meetings/`,
        method: 'POST',
        body: newMeeting,
      }),
      invalidatesTags: ['Meetings'],
    }),

    updateMeeting: builder.mutation<MeetingType, { meeting_id: string; changes: UpdateMeetingDto }>({
      query: ({ meeting_id, changes }) => ({
        url: `/meeting/meetings/${meeting_id}/`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (result, error, { meeting_id }) => [
        { type: 'Meetings' as const, id: meeting_id }
      ],
    }),

    getJoinMeetingLink: builder.query<JoinResponse, { meetingId: string, asModerator?: boolean }>({
      query: ({ meetingId, asModerator }) => ({
        url: `/meeting/meetings/${meetingId}/join-link/`,
        method: 'GET',
        params: {
          as_moderator: asModerator,
        }
      }),
    }),

    joinMeeting: builder.query<JoinResponse, { meetingId: string }>({
      query: ({ meetingId }) => ({
        url: `/meeting/meetings/${meetingId}/join/`,
        method: 'GET',
      }),
    }),

    // (optional) fetch a single meeting
    getMeeting: builder.query<MeetingType, { meetingId: string }>({
      query: meeting_id => `/meeting/meetings/${meeting_id}/`,
      providesTags: (result, error, { meetingId }) => [{ type: 'Meetings' as const, id: meetingId }],
    }),

    getMeetingsByProgram: builder.query<GetProgramMeetingsOutputType, { programId: number, pageNumber: number }>({
      query: ({ programId, pageNumber }) => ({
        url: `/meeting/meetings/`,
        method: 'GET',
        params: {
          program: programId,
          page: pageNumber,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useLazyGetJoinMeetingLinkQuery,
  useJoinMeetingQuery,
  useLazyJoinMeetingQuery,
  useGetMeetingQuery,
  useGetMeetingsByProgramQuery,
} = MeetingSlice;
