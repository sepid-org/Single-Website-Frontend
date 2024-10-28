import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { createInvalidationCallback } from 'commons/redux/utilities/createInvalidationCallback';

type CreateAccountInputType = {
  phoneNumber: string;
  password: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
}

type CreateAccountOutputType = {
  account: any;
  access: string;
  refresh: string;
};

type LoginGoogleUserInputType = {
  first_name: string;
  last_name: string;
  email: string;
}

type LoginGoogleUserOutputType = {
  account: any;
  access: string;
  refresh: string;
};

type GetGoogleUserProfileInput = {
  accessToken: string;
}

type GetGoogleUserProfileOutput = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean
}

type ChangePhoneNumberInput = {
  phone_number: string;
  code: string;
}

type LoginInput = {
  username: string;
  password: string;
}

type LoginOutputType = {
  access: string;
  refresh: string;
  account: any;
}

type ChangeUserPasswordInputType = {
  phoneNumber: string;
  password: string;
  verificationCode: string;
}

type ChangeUserPasswordOutputType = void;

type GetVerificationCodeInputType = {
  phoneNumber: string;
  codeType: string;
  websiteDisplayName: string;
}

type GetVerificationCodeOutputType = void;

export const UserSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    createAccount: builder.mutation<CreateAccountOutputType, CreateAccountInputType>({
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: ({ phoneNumber, verificationCode, firstName, lastName, ...body }) => ({
        url: 'auth/accounts/',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          code: verificationCode,
          first_name: firstName,
          last_name: lastName,
          ...body
        },
      }),
      transformResponse: (response: any): CreateAccountOutputType => {
        return response;
      },
      onQueryStarted: createInvalidationCallback(['user-specific-data'])
    }),

    getGoogleUserProfile: builder.query<GetGoogleUserProfileOutput, GetGoogleUserProfileInput>({
      query: (body) => ({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${body.accessToken}`,
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
          Accept: 'application/json'
        }
      })
    }),

    loginGoogleUser: builder.mutation<LoginGoogleUserOutputType, LoginGoogleUserInputType>({
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: (body) => ({
        url: 'auth/accounts/login-with-google/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): LoginGoogleUserOutputType => {
        return response;
      },
      onQueryStarted: createInvalidationCallback(['user-specific-data'])
    }),

    changePhoneNumber: builder.mutation<any, ChangePhoneNumberInput>({
      query: (body) => ({
        url: 'auth/accounts/change-phone-number/',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginOutputType, LoginInput>({
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: (body) => ({
        url: 'auth/accounts/login/',
        method: 'POST',
        body,
      }),
      onQueryStarted: createInvalidationCallback(['user-specific-data'])
    }),

    changeUserPassword: builder.mutation<ChangeUserPasswordOutputType, ChangeUserPasswordInputType>({
      query: ({ phoneNumber, verificationCode, ...body }) => ({
        url: 'auth/accounts/change_pass/',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          code: verificationCode,
          ...body,
        },
      }),
      transformResponse: (response: any): ChangeUserPasswordOutputType => {
        return response;
      },
    }),

    getVerificationCode: builder.mutation<GetVerificationCodeOutputType, GetVerificationCodeInputType>({
      query: ({ phoneNumber, codeType, websiteDisplayName }) => ({
        url: 'auth/accounts/verification_code/',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          code_type: codeType,
          website_display_name: websiteDisplayName,
        },
      }),
      transformResponse: (response: any): GetVerificationCodeOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useCreateAccountMutation,
  useGetGoogleUserProfileQuery,
  useLoginGoogleUserMutation,
  useChangePhoneNumberMutation,
  useLoginMutation,
  useChangeUserPasswordMutation,
  useGetVerificationCodeMutation,
} = UserSlice;
