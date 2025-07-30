import React, { FC } from "react";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const OtpAuthTabs: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get('tab') as LoginTabs);

  if (currentTab === LoginTabs.EnterVerificationNumber) {
    return (
      <EnterVerificationCode />
    );
  }

  return (
    <EnterPhoneNumber />
  );
};

export default OtpAuthTabs;