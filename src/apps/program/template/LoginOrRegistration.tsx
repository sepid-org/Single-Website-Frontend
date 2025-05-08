import React, { FC, useEffect, useState } from 'react';
import UsernameField from 'commons/components/molecules/form-fields/UsernameField';
import PasswordField from 'commons/components/molecules/form-fields/Password';
import { useGetVerificationCodeMutation, useLazyCheckUserRegistrationQuery, useOtpLoginMutation, useSimpleLoginMutation } from 'commons/redux/apis/party/UserApi';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import VerificationCodeField from 'commons/components/molecules/form-fields/VerificationCode';
import { toast } from 'react-toastify';
import formatPhoneNumber from 'commons/utils/formatPhoneNumber';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';

type PropsType = {
  onSuccessfulSubmission: any;
}

const LoginOrRegistration: FC<PropsType> = ({
  onSuccessfulSubmission,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [verificationCode, setVerificationCode] = useState<string>(null);
  const [hasSubmittedUsername, setHasSubmittedUsername] = useState(false);
  const [trigger, result] = useLazyCheckUserRegistrationQuery();
  const { data: website } = useGetWebsiteQuery();
  const [getVerificationCode, getVerificationCodeResult] = useGetVerificationCodeMutation();
  const [simpleLogin, simpleLoginResult] = useSimpleLoginMutation();
  const [otpLogin, otpLoginResult] = useOtpLoginMutation();

  const handleCheckUserRegistration = () => {
    if (hasSubmittedUsername) {
      setHasSubmittedUsername(false);
    } else {
      trigger({ username: phoneNumber });
      setHasSubmittedUsername(true);
    }
  }

  const hasPassword = result.data?.has_password;

  useEffect(() => {
    if (hasPassword === false) {
      getVerificationCode({ phoneNumber: formatPhoneNumber(phoneNumber), websiteDisplayName: website.title, codeType: 'create-user-account' });
    }
  }, [hasPassword])

  useEffect(() => {
    if (getVerificationCodeResult.isSuccess) {
      toast.success('کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود');
    }
  }, [getVerificationCodeResult.isSuccess])

  const handleRegularLogin = () => {
    if (!phoneNumber || !password) {
      return;
    }
    simpleLogin({ username: phoneNumber, password });
  }

  useEffect(() => {
    if (simpleLoginResult.isSuccess || otpLoginResult.isSuccess) {
      onSuccessfulSubmission()
    }
  }, [simpleLoginResult.isSuccess, otpLoginResult.isSuccess])

  const handleOtpLogin = () => {
    otpLogin({ phoneNumber: formatPhoneNumber(phoneNumber), verificationCode });
  }

  return (
    <Stack spacing={2} alignItems={'center'}>
      <Typography textAlign={'start'} variant='h2' paddingBottom={2}>{'ورود | ثبت‌نام'}</Typography>
      <Stack width={'100%'} maxWidth={440} spacing={2}>
        <Stack direction={'row'}>
          <UsernameField
            InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 }, disabled: hasSubmittedUsername }}
            onChange={(event) => setPhoneNumber(event.target.value)}
            username={phoneNumber}
            label={"شماره تلفن همراه"}
          />
          <Button
            disableElevation
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: 'auto',
              minWidth: 'fit-content'
            }}
            variant='contained'
            onClick={handleCheckUserRegistration}
          >
            {hasSubmittedUsername ? 'اصلاح شماره' : 'ثبت'}
          </Button>
        </Stack>
        {hasSubmittedUsername && hasPassword === true &&
          <>
            <PasswordField onChange={(event) => setPassword(event.target.value)} />
            <Button
              fullWidth
              variant='contained'
              onClick={handleRegularLogin}
            >
              {'ورود'}
            </Button>
          </>
        }
        {hasSubmittedUsername && hasPassword === false &&
          <>
            <VerificationCodeField
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              onClick={handleOtpLogin}
            >
              {'ورود'}
            </Button>
          </>
        }
      </Stack>
    </Stack>
  );
}

export default LoginOrRegistration;
