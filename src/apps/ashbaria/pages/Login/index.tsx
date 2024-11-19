import { Paper, Stack } from "@mui/material";
import React, { FC } from "react";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { ImageUrls } from "apps/ashbaria/constants/imageUrls";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Login: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;

  return (
    <FullScreenBackgroundImage image={ImageUrls.BEACH}>
      <Stack width={300} component={Paper} padding={2} spacing={2} marginRight={-20} alignItems={'center'} justifyContent={'center'}>
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
