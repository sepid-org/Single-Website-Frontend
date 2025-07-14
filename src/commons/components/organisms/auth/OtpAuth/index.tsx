import { Paper, Stack } from "@mui/material";
import React, { FC, Fragment } from "react";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const OtpAuthTabs: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;

  return (
    <>
      {currentTabSlug === LoginTabs.EnterPhoneNumber &&
        <EnterPhoneNumber />
      }
      {currentTabSlug === LoginTabs.EnterVerificationNumber &&
        <EnterVerificationCode />
      }
    </>
  );
};

export default OtpAuthTabs;