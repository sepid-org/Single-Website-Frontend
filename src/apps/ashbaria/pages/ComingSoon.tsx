import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../assets/profileBackground.svg";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";

export type ComingSoonPropsType = {};

const ComingSoon: FC<ComingSoonPropsType> = () => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack maxWidth={'sm'} component={Paper} padding={2} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <ProgramLogo />
        <Typography textAlign={'center'}>
          ثبت‌نام‌اولیه‌ت انجام شد:)
          به‌زودی شروع ماجرای آشباریا رو بهت خبر می‌دیم.
          تا اون موقع، فرصت مطالعه کتاب رو از دست نده
        </Typography>
      </Stack>
    </Box>
  );
};

export default ComingSoon;
