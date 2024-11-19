import { Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import FullScreenBackgroundImage from "../components/molecules/FullScreenBackgroundImage";
import BuyBookButton from "../components/molecules/buttons/BuyBook";
import { ImageUrls } from "../constants/imageUrls";

export type ComingSoonPropsType = {};

const ComingSoon: FC<ComingSoonPropsType> = () => {

  return (
    <FullScreenBackgroundImage image={ImageUrls.WALL}>
      <Stack maxWidth={'sm'} component={Paper} padding={2} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <ProgramLogo />
        <Typography textAlign={'center'}>
          ثبت‌نام‌اولیه‌ت انجام شد:)
          به‌زودی شروع ماجرای آشباریا رو بهت خبر می‌دیم.
          تا اون موقع، فرصت مطالعه کتاب رو از دست نده
        </Typography>
        <BuyBookButton />
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default ComingSoon;
