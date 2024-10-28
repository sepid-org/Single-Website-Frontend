import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import { useGetVerificationCodeMutation } from "apps/website-display/redux/features/user/UserSlice";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Login: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {currentTabSlug === LoginTabs.EnterPhoneNumber &&
        <EnterPhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      }
      {currentTabSlug === LoginTabs.EnterVerificationNumber &&
        <EnterVerificationCode phoneNumber={phoneNumber} />
      }
    </Box>
  );
};

export default Login;
