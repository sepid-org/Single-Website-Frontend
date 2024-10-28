import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import { useGetVerificationCodeMutation } from "apps/website-display/redux/features/user/UserSlice";
import EnterVerificationCode from "../Login/EnterVerificationCode";
import EnterPhoneNumber from "../Login/EnterPhoneNumber";
import { useSearchParams } from "react-router-dom";
import isPhoneNumber from "commons/utils/validators/isPhoneNumber";
import { toast } from "react-toastify";
import IntroductionPage1 from "./IntroductionPage1";
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";

export enum LoginTabs {
  EnterPhoneNumber = 'EnterPhoneNumber',
  EnterVerificationNumber = 'EnterVerificationNumber',
}

export type LoginPropsType = {};

const Introduction: FC<LoginPropsType> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

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
      {currentPage === 1 &&
        <IntroductionPage1 />
      }
      {currentPage === 2 &&
        <IntroductionPage2 />
      }
      {currentPage === 3 &&
        <IntroductionPage3 />
      }
    </Box>
  );
};

export default Introduction;
