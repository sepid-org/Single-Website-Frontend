import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";
import bg from "../../assets/introductionPage1.svg";
import guyIcon from "../../assets/thegay copy 1.svg";
import CustomDocumentPagination from "apps/ashbaria/components/molecules/CustomPagination";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextIntroductionPageButton from "apps/ashbaria/components/atoms/NextIntroductionPageButton";

type IntroductionPage1PropsType = {}

const IntroductionPage1: FC<IntroductionPage1PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        xs={7}
        sx={{
          minHeight: "100%",
          background: "linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: 2
        }}
      >
        <ProgramLogo />
        <Typography align='justify'>
          اگه الان توی این صفحه‌ای، یعنی احتمالاً برات سؤال شده که اینجا چه خبره و قضیۀ چیه. بخوام خلاصه برات بگم، پویش "راز آشباریا" یه مسابقۀ آنلاینه که جدا از هیجان رقابت با بقیه، جایزه‌هاش هم اونقدر جذاب هستن که ارزش دنبال کردن داشته باشه. همۀ ماجرا از کتاب ده راز آشباریا شروع میشه.در واقع این مسابقه یه اسپین‌آف از اون کتابه و شما قراره با بازیتون ادامۀ داستانش رو رقم بزنید...
        </Typography>
        <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            width={40}
            height={40}
            sx={{
              backgroundColor: "#00000066",
              border: "1px solid #60557E",
              color: "#60557E",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowForwardIcon />
          </Box>
          <CustomDocumentPagination numberOfPages={3} currentPage={1} setCurrentPage={setSearchParams} />
          <NextIntroductionPageButton handleClick={() => { setSearchParams({ page: "2" }) }} />
        </Stack>
      </Grid>
      <Grid
        xs={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <Box
          component="img"
          src={guyIcon}
          height="75%"
        />
      </Grid>
    </Grid>
  );
};

export default IntroductionPage1;