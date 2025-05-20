import { SchoolStudentshipType, UserInfoType } from 'commons/types/profile';
import { WebsiteType } from 'commons/types/global';
import { WMS_URL } from 'commons/constants/Constants';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { UserPublicInfoType } from 'commons/types/models';

type UpdateUserProfileInputType = {
  userId: string;
} & Partial<UserInfoType>;

type GetUserProfileOutputType = UserInfoType;

type GetUserProfileSummaryOutputType = UserPublicInfoType;

type UpdateSchoolStudentshipInputType = Partial<SchoolStudentshipType>;

type GetSchoolStudentshipOutputType = SchoolStudentshipType;

type GetWebsiteProfileInputType = {}

type GetWebsiteProfileOutputType = Partial<WebsiteType>;

export const ProfileSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUserProfile: builder.query<GetUserProfileOutputType, void>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: () => ({
        url: `/auth/profile/current/`,
        method: 'GET',
      }),
    }),

    updateUserProfile: builder.mutation<GetUserProfileOutputType, UpdateUserProfileInputType>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ userId, ...body }) => ({
        url: `auth/profile/${userId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    updateSchoolStudentship: builder.mutation<GetSchoolStudentshipOutputType, UpdateSchoolStudentshipInputType>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ id, ...body }) => ({
        url: `auth/studentship/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    getUserProfileSummary: builder.query<GetUserProfileSummaryOutputType, { userId: string }>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ userId: partyId }) => ({
        url: `auth/profile/${partyId}/profile_summary/`,
        method: 'GET',
      }),
    }),

    getWebsiteProfileSummary: builder.query<GetWebsiteProfileOutputType, GetWebsiteProfileInputType>({
      providesTags: ['website-profile'],
      query: ({ }) => {
        return ({
          // todo: get website profile summary
          url: `${WMS_URL}api/website/get-website/`,
          method: 'GET',
        })
      },
    }),
  })
});

export const {
  useGetCurrentUserProfileQuery,
  useGetUserProfileSummaryQuery,
  useGetWebsiteProfileSummaryQuery,
  useUpdateUserProfileMutation,
  useUpdateSchoolStudentshipMutation,
} = ProfileSlice;
