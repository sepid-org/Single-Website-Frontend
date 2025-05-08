import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { invalidateMyTagsAcrossApis } from 'commons/redux/utilities/tagInvalidation';

type CreateAccountInputType = {
  phoneNumber: string;
  password: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
}

type CreateAccountOutputType = {
  user: any;
  access: string;
  refresh: string;
};

type GoogleLoginUserInputType = {
  first_name: string;
  last_name: string;
  email: string;
}

type GoogleLoginUserOutputType = {
  user: any;
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

type SimpleLoginInput = {
  username: string;
  password: string;
}

type SimpleLoginOutputType = {
  access: string;
  refresh: string;
  user: any;
}

type OTPLoginInputType = {
  phoneNumber: string;
  verificationCode: string;
}

type OTPLoginOutputType = {
  access: string;
  refresh: string;
  user: any;
}

type UUIDLoginInputType = {
  userId: string;
  origin: string;
  landingId: number;
}

type UUIDLoginOutputType = {
  access: string;
  refresh: string;
  user: any;
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

export const UserApi = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation<{ detail: string }, { refreshToken: string }>({
      invalidatesTags: ['UserAuthentication'],
      query: ({ refreshToken }) => ({
        url: 'auth/accounts/logout/',
        method: 'POST',
        body: {
          refresh: refreshToken
        }
      }),
    }),

    checkUserRegistration: builder.query<{ is_registered: boolean, has_password: boolean }, { username: string }>({
      query: ({ username }) => ({
        url: 'auth/accounts/check-user-registration/',
        params: { username },
      }),
    }),

    checkAuthentication: builder.query<{ status: 'authenticated' | 'unauthenticated' }, void>({
      providesTags: ['UserAuthentication'],
      query: () => 'auth/accounts/check-authentication/',
    }),

    createAccount: builder.mutation<CreateAccountOutputType, CreateAccountInputType>({
      invalidatesTags: ['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication'],
      onQueryStarted: invalidateMyTagsAcrossApis(),
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
    }),

    simpleLogin: builder.mutation<SimpleLoginOutputType, SimpleLoginInput>({
      invalidatesTags: tagGenerationWithErrorCheck(['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication']),
      onQueryStarted: invalidateMyTagsAcrossApis(),
      query: (body) => ({
        url: 'auth/accounts/simple-login/',
        method: 'POST',
        body,
      }),
    }),

    otpLogin: builder.mutation<OTPLoginOutputType, OTPLoginInputType>({
      invalidatesTags: ['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication'],
      onQueryStarted: invalidateMyTagsAcrossApis(),
      query: ({ phoneNumber, verificationCode }) => ({
        url: 'auth/accounts/otp-login/',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          code: verificationCode,
        },
      }),
    }),

    uuidLogin: builder.mutation<UUIDLoginOutputType, UUIDLoginInputType>({
      invalidatesTags: ['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication'],
      onQueryStarted: invalidateMyTagsAcrossApis(),
      query: ({ userId, landingId, ...props }) => ({
        url: 'auth/accounts/uuid-login/',
        method: 'POST',
        body: {
          user_id: userId,
          landing_id: landingId,
          ...props,
        },
      }),
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

    googleLogin: builder.mutation<GoogleLoginUserOutputType, GoogleLoginUserInputType>({
      invalidatesTags: ['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication'],
      onQueryStarted: invalidateMyTagsAcrossApis(),
      query: (body) => ({
        url: 'auth/accounts/google-login/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): GoogleLoginUserOutputType => {
        return response;
      },
    }),

    changePhoneNumber: builder.mutation<any, ChangePhoneNumberInput>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: (body) => ({
        url: 'auth/accounts/change-phone-number/',
        method: 'POST',
        body,
      }),
    }),

    changeUserPassword: builder.mutation<ChangeUserPasswordOutputType, ChangeUserPasswordInputType>({
      query: ({ phoneNumber, verificationCode, ...body }) => ({
        url: 'auth/accounts/change-password/',
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
        url: 'auth/accounts/verification-code/',
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
  useLogoutMutation,
  useLazyCheckUserRegistrationQuery,
  useCheckAuthenticationQuery,
  useSimpleLoginMutation,
  useGoogleLoginMutation,
  useOtpLoginMutation,
  useUuidLoginMutation,
  useCreateAccountMutation,
  useGetGoogleUserProfileQuery,
  useChangePhoneNumberMutation,
  useChangeUserPasswordMutation,
  useGetVerificationCodeMutation,
} = UserApi;
