import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';

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
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: (body) => ({
        url: 'auth/accounts/google-login/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): GoogleLoginUserOutputType => {
        return response;
      },
    }),

    simpleLogin: builder.mutation<SimpleLoginOutputType, SimpleLoginInput>({
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: (body) => ({
        url: 'auth/accounts/simple-login/',
        method: 'POST',
        body,
      }),
    }),

    otpLogin: builder.mutation<OTPLoginOutputType, OTPLoginInputType>({
      invalidatesTags: ['player', 'registration-receipt', 'user-profile'],
      query: ({ phoneNumber, verificationCode }) => ({
        url: 'auth/accounts/otp-login/',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          code: verificationCode,
        },
      }),
    }),

    changePhoneNumber: builder.mutation<any, ChangePhoneNumberInput>({
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
  useSimpleLoginMutation,
  useGoogleLoginMutation,
  useOtpLoginMutation,
  useCreateAccountMutation,
  useGetGoogleUserProfileQuery,
  useChangePhoneNumberMutation,
  useChangeUserPasswordMutation,
  useGetVerificationCodeMutation,
} = UserApi;
