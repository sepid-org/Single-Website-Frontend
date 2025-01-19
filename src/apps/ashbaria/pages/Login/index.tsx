import { Paper, Stack } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import EnterVerificationCode from "./EnterVerificationCode";
import EnterPhoneNumber from "./EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";
import banner from "../../assets/banner.png";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Login: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showBanner, setShowBanner] = useState<boolean>(() => {
    // Check local storage on initial render
    const bannerSeen = localStorage.getItem('initialBannerSeen');
    return bannerSeen !== 'true';
  });

  const currentTabSlug = (searchParams.get('tab') as LoginTabs) || LoginTabs.EnterPhoneNumber;

  const handleCloseBanner = () => {
    // Mark banner as seen in local storage
    localStorage.setItem('initialBannerSeen', 'true');
    setShowBanner(false);
  };

  return (
    <Fragment>
      {/* {showBanner &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            boxSizing: 'border-box'
          }}
          onClick={handleCloseBanner}
        >
          <Stack
            maxWidth={'md'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              position: 'relative',
              maxHeight: '85vh',
              height: '100%',
            }}
          >
            <img
              src={banner}
              alt="Welcome Banner"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </Stack>
        </div>
      } */}
      <FullScreenBackgroundImage image={MediaUrls.BEACH}>
        <Stack
          width={300}
          component={Paper}
          padding={2}
          spacing={2}
          marginRight={-20}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {currentTabSlug === LoginTabs.EnterPhoneNumber &&
            <EnterPhoneNumber />
          }
          {currentTabSlug === LoginTabs.EnterVerificationNumber &&
            <EnterVerificationCode />
          }
        </Stack>
      </FullScreenBackgroundImage>
    </Fragment>
  );
};

export default Login;