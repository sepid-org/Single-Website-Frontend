import { MeetingType } from 'apps/program/template/types';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';


export interface CreateMeetingDto {
  meeting_id: string;
  title: string;
  description?: string;
  program: number;
  start_time: string;
  duration: string;
  location_type?: 'online' | 'physical' | 'hybrid';
}

export interface UpdateMeetingDto {
  title?: string;
  description?: string;
  program?: number;
  start_time?: string;
  duration?: string;
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
      invalidatesTags: (result, error, item) => [{ type: 'Meetings', id: result.program }],
      query: newMeeting => ({
        url: `/meeting/meetings/`,
        method: 'POST',
        body: newMeeting,
      }),
    }),

    updateMeeting: builder.mutation<MeetingType, { meeting_id: string; changes: UpdateMeetingDto }>({
      invalidatesTags: (result, error, item) => [{ type: 'Meetings', id: result.program }],
      query: ({ meeting_id, changes }) => ({
        url: `/meeting/meetings/${meeting_id}/`,
        method: 'PATCH',
        body: changes,
      }),
    }),

    deleteMeeting: builder.mutation<void, { meetingId: string; programId: number }>({
      invalidatesTags: (result, error, { programId }) => [{ type: 'Meetings', id: programId }],
      query: ({ meetingId }) => ({
        url: `/meeting/meetings/${meetingId}/`,
        method: 'DELETE',
      }),
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
    }),

    getMeetingsByProgram: builder.query<GetProgramMeetingsOutputType, { programId: number, startDate?: string }>({
      providesTags: (result, error, item) => [{ type: 'Meetings', id: item.programId }],
      query: ({ programId, startDate }) => ({
        url: `/meeting/meetings/`,
        method: 'GET',
        params: {
          program: programId,
          start_date: startDate,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useDeleteMeetingMutation,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useLazyGetJoinMeetingLinkQuery,
  useJoinMeetingQuery,
  useLazyJoinMeetingQuery,
  useGetMeetingQuery,
  useGetMeetingsByProgramQuery,
} = MeetingSlice;
