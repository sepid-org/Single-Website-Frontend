import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { toEnglishNumber } from "commons/utils/translateNumber";
import { useSearchParams } from "react-router-dom";
import { useGetVerificationCodeMutation } from "apps/website-display/redux/features/user/UserSlice";
import { LoginTabs } from ".";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";

type EnterPhoneNumberPropsType = {
  phoneNumber: string;
  setPhoneNumber: any;
}

const EnterPhoneNumber: FC<EnterPhoneNumberPropsType> = ({
  phoneNumber,
  setPhoneNumber,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getVerificationCode, getVerificationCodeResult] = useGetVerificationCodeMutation();

  useEffect(() => {
    if (getVerificationCodeResult.isSuccess) {
      setSearchParams({ tab: LoginTabs.EnterVerificationNumber });
    }
  }, [getVerificationCodeResult]);

  const handleGetVerificationCode = () => {
    if (!isPhoneNumber(phoneNumber)) {
      toast.error('شماره تلفن وارد شده، معتبر نیست')
      return;
    }
    getVerificationCode({ phoneNumber, websiteDisplayName: 'آشباریا', codeType: 'create-user-account' });
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(toEnglishNumber(e.target.value))
  }

  return (
    <Stack width={300} component={Paper} padding={2} spacing={4}>
      <ProgramLogo />
      <Stack spacing={1}>
        <Typography textAlign={'center'}>
          {'بی‌زحمت شماره موبایلتو بزن:'}
        </Typography>
        <TextField
          value={phoneNumber}
          placeholder='09123456789'
          onChange={handleChangePhoneNumber}
          inputProps={{ dir: 'ltr' }}
        />
      </Stack>
      <Button variant='contained' onClick={handleGetVerificationCode}>
        {'دریافت کد تایید'}
      </Button>
    </Stack>
  );
};

export default EnterPhoneNumber;
