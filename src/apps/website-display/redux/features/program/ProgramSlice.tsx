import { UserFSMStatusType, ProgramType, ProgramUserPermissions } from 'commons/types/models';
import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';

type GetProgramsInputType = {
  isVisible?: boolean;
  pageNumber?: number;
}

type GetProgramsOutputType = {
  programs: ProgramType[];
  count: number;
}

type GetProgramInputType = {
  programSlug: string;
}

type GetProgramOutputType = ProgramType;

type GetProgramUserPermissionsInputType = {
  programSlug: string;
}

type GetProgramUserPermissionsOutputType = ProgramUserPermissions;

type GetProgramUserFSMsStatusInputType = {
  programSlug: string;
}

type GetProgramUserFSMsStatusOutputType = UserFSMStatusType[];

type UpdateProgramInputType = {
  programSlug: string;
} & Partial<ProgramType>;

type UpdateProgramOutputType = {

}

type CreateProgramInputType = {
  website: string;
} & Partial<ProgramType>;

type CreateProgramOutputType = {

}

export const ProgramSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    createProgram: builder.mutation<CreateProgramOutputType, CreateProgramInputType>({
      invalidatesTags: [{ type: 'Program', id: 'ALL' }],
      query: (body) => ({
        url: `/program/program/`,
        method: 'POST',
        body,
      }),
    }),

    updateProgram: builder.mutation<UpdateProgramOutputType, UpdateProgramInputType>({
      invalidatesTags: ['Program', { type: 'Program', id: 'ALL' }],
      query: ({ programSlug, ...body }) => ({
        url: `/program/program/${programSlug}/`,
        method: 'PATCH',
        body,
      }),
    }),

    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      query: ({ pageNumber = 1, isVisible }) => ({
        url: 'program/program/',
        params: {
          page: pageNumber,
          is_visible: isVisible,
        },
        isSimpleRequest: true,
      }),
      transformResponse: (response: any): GetProgramsOutputType => ({
        programs: response.results,
        count: response.count,
      }),
      providesTags: [{ type: 'Program', id: 'ALL' }],
    }),

    getProgram: builder.query<GetProgramOutputType, GetProgramInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'Program', id: item.programSlug }]
      ),
      query: ({ programSlug }) => `program/program/${programSlug}/`,
    }),

    getProgramUserPermissions: builder.query<GetProgramUserPermissionsOutputType, GetProgramUserPermissionsInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'Program', id: 'MY' }, { type: 'Program', id: item.programSlug }]
      ),
      query: ({ programSlug }) => `program/program/${programSlug}/user-permissions/`,
    }),

    getProgramUserFSMsStatus: builder.query<GetProgramUserFSMsStatusOutputType, GetProgramUserFSMsStatusInputType>({
      providesTags: [{ type: 'FSM', id: 'MY' }, { type: 'FSM', id: 'ALL' }],
      query: ({ programSlug }) => `program/program/${programSlug}/user-fsms-status/`,
    }),

    softDeleteProgram: builder.mutation<any, { programSlug: string }>({
      invalidatesTags: [{ type: 'Program', id: 'ALL' }],
      query: ({ programSlug }) => `program/program/${programSlug}/delete/`
    }),

    registerUserInProgram: builder.mutation<any, { registrationFormId: string, username: string }>({
      invalidatesTags: ['registration-receipt'],
      query: ({ registrationFormId, username }) => ({
        url: `program/registration_form_admin/${registrationFormId}/register_user_in_program/`,
        method: 'POST',
        body: {
          username,
        },
      }),
    }),
  })
});

export const {
  useGetProgramQuery,
  useGetProgramsQuery,
  useUpdateProgramMutation,
  useCreateProgramMutation,
  useSoftDeleteProgramMutation,
  useRegisterUserInProgramMutation,
  useGetProgramUserPermissionsQuery,
  useGetProgramUserFSMsStatusQuery,
} = ProgramSlice;
