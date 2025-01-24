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

  const isRegistered = result.data?.is_registered;

  useEffect(() => {
    if (isRegistered === false) {
      getVerificationCode({ phoneNumber: formatPhoneNumber(phoneNumber), websiteDisplayName: website.display_name, codeType: 'create-user-account' });
    }
  }, [isRegistered])

  useEffect(() => {
    if (getVerificationCodeResult.isSuccess) {
      toast.success('کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی می‌شود');
    }
  }, [getVerificationCodeResult])

  const handleRegularLogin = () => {
    if (!phoneNumber || !password) {
      return;
    }
    simpleLogin({ username: phoneNumber, password });
  }

  useEffect(() => {
    if (simpleLoginResult.isSuccess || otpLoginResult.isSuccess) {
      onSuccessfulSubmission()
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    }
  }, [simpleLoginResult, otpLoginResult])

  const handleOtpLogin = () => {
    otpLogin({ phoneNumber: formatPhoneNumber(phoneNumber), verificationCode });
  }

  return (
    <Container maxWidth='xs'>
      <Stack spacing={2}>
        <Typography variant='h2' paddingBottom={2}>{'ورود | ثبت‌نام'}</Typography>
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
            {hasSubmittedUsername ? 'ثبت مجدد' : 'ثبت'}
          </Button>
        </Stack>
        {isRegistered === true &&
          <>
            <PasswordField
              onChange={(event) => setPassword(event.target.value)}
              resetPasswordLink='/reset-password/'
            />
            <Button
              fullWidth
              variant='contained'
              onClick={handleRegularLogin}
            >
              {'ورود'}
            </Button>
          </>
        }
        {isRegistered === false &&
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
    </Container>
  );
}

export default LoginOrRegistration;
