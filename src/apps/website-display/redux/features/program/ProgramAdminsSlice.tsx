import { ContentManagementServiceApi } from '../ManageContentServiceApiSlice';
import { UserInfoType } from 'commons/types/profile';

type ProgramInputType = {
  programSlug: string;
}

type GetProgramAdminsOutputType = UserInfoType[];

type AddAdminToProgramInputType = {
  programSlug: string;
  username: string;
};

type AddAdminToProgramOutputType = {

}

type RemoveAdminFromProgramInputType = {
  programSlug: string;
  username: string;
};

type RemoveAdminFromProgramOutputType = {

}

export const ProgramAdminsSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({

    getProgramAdmins: builder.query<GetProgramAdminsOutputType, ProgramInputType>({
      providesTags: ['program-admins'],
      query: ({ programSlug }) => `/program/program/${programSlug}/get_admins/`,
      transformResponse: (response: any): GetProgramAdminsOutputType => {
        return response;
      },
    }),

    addAdminToProgram: builder.mutation<AddAdminToProgramOutputType, AddAdminToProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programSlug, ...body }) => ({
        url: `/program/program/${programSlug}/add_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdminToProgramOutputType => {
        return response;
      },
    }),

    removeAdminFromProgram: builder.mutation<RemoveAdminFromProgramOutputType, RemoveAdminFromProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programSlug, ...body }) => ({
        url: `/program/program/${programSlug}/remove_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdminToProgramOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetProgramAdminsQuery,
  useAddAdminToProgramMutation,
  useRemoveAdminFromProgramMutation,
} = ProgramAdminsSlice;
