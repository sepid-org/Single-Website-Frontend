import { Button, Stack, Typography } from "@mui/material";
import React, { FC, Fragment, useEffect } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";
import { useGetVerificationCodeMutation } from "commons/redux/apis/party/UserApi";
import { LoginTabs } from ".";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import PhoneNumberInput from "commons/components/molecules/profile-inputs/PhoneNumberInput";
import formatPhoneNumber from "commons/utils/formatPhoneNumber";

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
    getVerificationCode({ phoneNumber: formatPhoneNumber(phoneNumber), websiteDisplayName: 'آشباریا', codeType: 'create-user-account' });
  };

  const handleChangePhoneNumber = (value) => {
    setSearchParams({ phoneNumber: toEnglishNumber(value) })
  }

  const phoneNumber = searchParams.get('phoneNumber') || '';

  return (
    <Fragment>
      <ProgramLogo />
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
      </Stack>
      <Button fullWidth variant='contained' onClick={handleGetVerificationCode}>
        {'دریافت کد تایید'}
      </Button>
    </Fragment>
  );
};

export default EnterPhoneNumber;
