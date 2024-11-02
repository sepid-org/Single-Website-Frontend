import { Paper, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";

type ExamResultPagePropsType = {};

const ExamResultPage: FC<ExamResultPagePropsType> = () => {

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack width={300} component={Paper} padding={2} spacing={2}>
        {/* todo */}
      </Stack>
    </FullScreenBackgroundImage>);
};

export default ExamResultPage;
