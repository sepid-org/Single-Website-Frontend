import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Login: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;

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
        <EnterPhoneNumber />
      }
      {currentTabSlug === LoginTabs.EnterVerificationNumber &&
        <EnterVerificationCode />
      }
    </Box>
  );
};

export default Login;
