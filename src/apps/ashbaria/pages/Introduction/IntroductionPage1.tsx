import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC, Fragment } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";

type IntroductionPage1PropsType = {}

const IntroductionPage1: FC<IntroductionPage1PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Fragment>
      <ProgramLogo />
      <Typography align='justify'>
        اگه الان توی این صفحه‌ای، یعنی احتمالاً برات سؤال شده که اینجا چه خبره و قضیۀ چیه. بخوام خلاصه برات بگم، پویش "راز آشباریا" یه مسابقۀ آنلاینه که جدا از هیجان رقابت با بقیه، جایزه‌هاش هم اونقدر جذاب هستن که ارزش دنبال کردن داشته باشه. همۀ ماجرا از کتاب ده راز آشباریا شروع میشه.در واقع این مسابقه یه اسپین‌آف از اون کتابه و شما قراره با بازیتون ادامۀ داستانش رو رقم بزنید...
      </Typography>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button disabled  >
          {'بازگشت'}
        </Button>
        <Button onClick={() => setSearchParams({ page: "2" })}>
          {'بعدی'}
        </Button>
      </Stack>
    </Fragment>
  );
};

export default IntroductionPage1;
