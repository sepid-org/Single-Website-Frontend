import { Button, Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetVerificationCodeMutation } from "commons/redux/apis/party/UserApi";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import PhoneNumberInput from "commons/components/molecules/profile-inputs/PhoneNumberInput";
import { LoginTabs } from ".";

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
  }, [getVerificationCodeResult.isSuccess]);

  const handleGetVerificationCode = () => {
    if (!isPhoneNumber(phoneNumber)) {
      toast.error('بی‌خیال، یه شماره تلفن معتبر وارد کن')
      return;
    }
    getVerificationCode({ phoneNumber, verificationType: 'create-user-account' });
  };

  const handleChangePhoneNumber = (value) => {
    setSearchParams({ phoneNumber: toEnglishNumber(value) })
  }

  const phoneNumber = searchParams.get('phoneNumber') || '';

  return (
    <Stack spacing={1} width={'100%'}>
      <Typography textAlign={'center'}>
        {'بی‌زحمت شماره موبایلتو بزن:'}
      </Typography>
      <PhoneNumberInput
        phoneNumber={phoneNumber}
        setPhoneNumber={handleChangePhoneNumber}
        editable={false}
        placeHolder={"09123456789"}
        textDir="ltr"
        isRequired={false}
      />
      <Button fullWidth variant='contained' onClick={handleGetVerificationCode}>
        {'دریافت کد تایید'}
      </Button>
    </Stack>
  );
};

export default EnterPhoneNumber;
