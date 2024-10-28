import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";
import { useGetVerificationCodeMutation } from "commons/redux/slices/party/UserApi";
import { LoginTabs } from ".";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";

type EnterPhoneNumberPropsType = {}

const EnterPhoneNumber: FC<EnterPhoneNumberPropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getVerificationCode, getVerificationCodeResult] = useGetVerificationCodeMutation();

  useEffect(() => {
    if (getVerificationCodeResult.isSuccess) {
      setSearchParams({
        tab: LoginTabs.EnterVerificationNumber,
        phoneNumber,
      });
    }
  }, [getVerificationCodeResult]);

  const handleGetVerificationCode = () => {
    if (!isPhoneNumber(phoneNumber)) {
      toast.error('بی‌خیال، یه شماره تلفن معتبر وارد کن')
      return;
    }
    getVerificationCode({ phoneNumber, websiteDisplayName: 'آشباریا', codeType: 'create-user-account' });
  };

  const handleChangePhoneNumber = (e) => {
    setSearchParams({ phoneNumber: toEnglishNumber(e.target.value) })
  }

  const phoneNumber = searchParams.get('phoneNumber') || '';

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
