import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { toPersianNumber } from "commons/utils/translateNumber";
import { useSearchParams } from "react-router-dom";
import { Golden } from "apps/ashbaria/constants/colors";
import { LoginTabs } from ".";
import { useOtpLoginMutation } from "commons/redux/slices/party/UserApi";

type EnterVerificationCodePropsType = {}

const EnterVerificationCode: FC<EnterVerificationCodePropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [otpLogin, otpLoginResult] = useOtpLoginMutation();
  const phoneNumber = searchParams.get('phoneNumber');

  const handleChangeVerificationCode = (event) => {
    setVerificationCode(event.target.value);
  }

  const handleGoToPreviousPage = () => {
    setSearchParams({ tab: LoginTabs.EnterPhoneNumber })
  }

  const handleLogin = () => {
    otpLogin({
      phoneNumber,
      verificationCode,
    })
  }

  return (
    <Stack width={300} component={Paper} padding={2} spacing={2}>
      <ProgramLogo />
      <Stack spacing={1}>
        <Typography textAlign={'center'}>
          {`کد پنج‌رقمی رو برای شماره ${toPersianNumber(phoneNumber)} فرستادیم. این پایین واردش کن:`}
        </Typography>
        <TextField
          value={verificationCode}
          placeholder='12345'
          onChange={handleChangeVerificationCode}
          inputProps={{ dir: 'ltr' }}
        />
      </Stack>
      <Button variant='contained' onClick={handleLogin}>
        {'نیومد که، دوباره بفرست!'}
      </Button>
      <Button onClick={handleGoToPreviousPage}>
        <Typography color={Golden}>
          {'شمارمو اشتباه نوشتم!'}
        </Typography>
      </Button>
    </Stack>
  );
};

export default EnterVerificationCode;
