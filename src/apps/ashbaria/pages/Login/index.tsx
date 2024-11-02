import { Paper, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Login: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack width={300} component={Paper} padding={2} spacing={2} marginRight={-20}>
        {currentTabSlug === LoginTabs.EnterPhoneNumber &&
          <EnterPhoneNumber />
        }
        {currentTabSlug === LoginTabs.EnterVerificationNumber &&
          <EnterVerificationCode />
        }
      </Stack>
    </FullScreenBackgroundImage >
  );
};

export default Login;
