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
        url: `/fsm/program/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    updateProgram: builder.mutation<UpdateProgramOutputType, UpdateProgramInputType>({
      invalidatesTags: ['Program', { type: 'Program', id: 'ALL' }],
      query: ({ programSlug, ...body }) => ({
        url: `/fsm/program/${programSlug}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      query: ({ pageNumber = 1, isVisible }) => ({
        url: 'fsm/program/',
        params: {
          page: pageNumber,
          is_visible: isVisible,
        },
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
      query: ({ programSlug }) => `fsm/program/${programSlug}/`,
      transformResponse: (response: any): GetProgramOutputType => {
        return response;
      },
    }),

    getProgramUserPermissions: builder.query<GetProgramUserPermissionsOutputType, GetProgramUserPermissionsInputType>({
      providesTags: tagGenerationWithErrorCheck((result, error, item) =>
        [{ type: 'Program', id: 'MY' }, { type: 'Program', id: item.programSlug }]
      ),
      query: ({ programSlug }) => `fsm/program/${programSlug}/user-permissions/`,
      transformResponse: (response: any): GetProgramUserPermissionsOutputType => {
        return response;
      },
    }),

    getProgramUserFSMsStatus: builder.query<GetProgramUserFSMsStatusOutputType, GetProgramUserFSMsStatusInputType>({
      providesTags: [{ type: 'FSM', id: 'MY' }, { type: 'FSM', id: 'ALL' }],
      query: ({ programSlug }) => `fsm/program/${programSlug}/user-fsms-status/`,
      transformResponse: (response: any): GetProgramUserFSMsStatusOutputType => {
        return response;
      },
    }),

    softDeleteProgram: builder.mutation<any, { programSlug: string }>({
      invalidatesTags: [{ type: 'Program', id: 'ALL' }],
      query: ({ programSlug }) => `fsm/program/${programSlug}/soft_delete/`
    }),

    registerUserInProgram: builder.mutation<any, { registrationFormId: string, username: string }>({
      invalidatesTags: ['registration-receipt'],
      query: ({ registrationFormId, username }) => ({
        url: `fsm/registration_form_admin/${registrationFormId}/register_user_in_program/`,
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
