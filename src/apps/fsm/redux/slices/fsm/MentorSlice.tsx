import { UserPublicInfoType } from 'commons/types/models';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type AddMentorInputType = {
  fsmId: number;
  username: string;
}

type AddMentorOutputType = {

}

type DeleteMentorInputType = {
  fsmId: number;
  username: string;
}

type DeleteMentorOutputType = {

}

type GetFSMMentorsInputType = {
  fsmId: number;
}

type GetFSMMentorsOutputType = UserPublicInfoType[];

export const MentorSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getFSMMentors: builder.query<GetFSMMentorsOutputType, GetFSMMentorsInputType>({
      providesTags: tagGenerationWithErrorCheck(['fsm-mentors']),
      query: ({ fsmId }) => `/fsm/fsm/${fsmId}/get_mentors/`,
    }),

    addMentorToFSM: builder.mutation<AddMentorOutputType, AddMentorInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-mentors']),
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/add_mentor/`,
        method: 'POST',
        body,
      }),
    }),

    removeMentorFromFSM: builder.mutation<DeleteMentorOutputType, DeleteMentorInputType>({
      invalidatesTags: tagGenerationWithErrorCheck(['fsm-mentors']),
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/remove_mentor/`,
        method: 'POST',
        body,
      }),
    }),
  })
});

export const {
  useGetFSMMentorsQuery,
  useAddMentorToFSMMutation,
  useRemoveMentorFromFSMMutation,
} = MentorSlice;
