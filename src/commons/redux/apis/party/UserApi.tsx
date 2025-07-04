import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import tagGenerationWithErrorCheck from 'commons/redux/utilities/tagGenerationWithErrorCheck';
import { invalidateMyTagsAcrossApis } from 'commons/redux/utilities/tagInvalidation';
import formatPhoneNumber from 'commons/utils/formatPhoneNumber';

type CreateAccountInputType = {
  phoneNumber: string;
  password: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
}

type CreateAccountOutputType = {
  access: string;
  refresh: string;
};

type GoogleLoginUserInputType = {
  first_name: string;
  last_name: string;
  email: string;
}

type GoogleLoginUserOutputType = {
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
  verified_email: boolean;
}

type ChangePhoneNumberInput = {
  phoneNumber: string;
  verificationCode: string;
}

type SimpleLoginInput = {
  username: string;
  password: string;
}

type SimpleLoginOutputType = {
  access: string;
  refresh: string;
}

type OTPLoginInputType = {
  phoneNumber: string;
  verificationCode: string;
}

type OTPLoginOutputType = {
  access: string;
  refresh: string;
}

type UUIDLoginInputType = {
  userId: string;
  origin: string;
  landingId: number;
}

type UUIDLoginOutputType = {
  access: string;
  refresh: string;
}

type ChangeUserPasswordInputType = {
  phoneNumber: string;
  password: string;
  verificationCode: string;
}

type ChangeUserPasswordOutputType = void;

type GetVerificationCodeInputType = {
  phoneNumber: string;
  verificationType: string;
}

type GetVerificationCodeOutputType = void;

export const UserApi = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation<{ detail: string }, { refreshToken: string }>({
      invalidatesTags: ['UserAuthentication'],
      query: ({ refreshToken }) => ({
        url: 'auth/accounts/logout/',
        method: 'POST',
        body: { refresh: refreshToken }
      }),
    }),

    checkUserRegistration: builder.query<{ is_registered: boolean; has_password: boolean }, { username: string }>({
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
          phone_number: formatPhoneNumber(phoneNumber),
          code: verificationCode,
          first_name: firstName,
          last_name: lastName,
          ...body
        },
      }),
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
          phone_number: formatPhoneNumber(phoneNumber),
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
      query: ({ accessToken }) => ({
        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        isSimpleRequest: true,
      }),
    }),

    googleLogin: builder.mutation<GoogleLoginUserOutputType, GoogleLoginUserInputType>({
      invalidatesTags: ['player', 'registration-receipt', { type: 'Profile', id: 'MY' }, 'UserAuthentication'],
      onQueryStarted: invalidateMyTagsAcrossApis(),
      query: (body) => ({
        url: 'auth/accounts/google-login/',
        method: 'POST',
        body,
      }),
    }),

    changePhoneNumber: builder.mutation<any, ChangePhoneNumberInput>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ phoneNumber, verificationCode }) => ({
        url: 'auth/accounts/change-phone-number/',
        method: 'POST',
        body: {
          phone_number: formatPhoneNumber(phoneNumber),
          code: verificationCode,
        },
      }),
    }),

    changeUserPassword: builder.mutation<ChangeUserPasswordOutputType, ChangeUserPasswordInputType>({
      query: ({ phoneNumber, verificationCode, ...body }) => ({
        url: 'auth/accounts/change-password/',
        method: 'POST',
        body: {
          phone_number: formatPhoneNumber(phoneNumber),
          code: verificationCode,
          ...body,
        },
      }),
    }),

    getVerificationCode: builder.mutation<GetVerificationCodeOutputType, GetVerificationCodeInputType>({
      query: ({ phoneNumber, verificationType }) => ({
        url: 'auth/accounts/verification-code/',
        method: 'POST',
        body: {
          phone_number: formatPhoneNumber(phoneNumber),
          verification_type: verificationType,
        },
      }),
    }),
  }),
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