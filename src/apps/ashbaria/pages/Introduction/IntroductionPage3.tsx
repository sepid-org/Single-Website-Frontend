import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";
import AshbariaPoster from "apps/ashbaria/components/atoms/icons/AshbariaPoster";

type IntroductionPage3PropsType = {}

const IntroductionPage3: FC<IntroductionPage3PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Stack width={500} component={Paper} padding={2} spacing={2}>
      {/* <ProgramLogo /> */}
      <Stack direction={'row'} spacing={2} alignItems={'start'}>
        <Stack spacing={2} alignItems={'start'}>
          <Typography align='justify'>
            لازمه بگم که اگه کتاب رو هنوز نخوندید هم می‌تونید مسابقه رو شروع کنید، ولی اگه دوست دارین توی کورس رقابت باقی بمونین، لازمه قبل از بازی اون رو مطالعه کنید، چون که خیلی جاها به اطلاعاتی که داخل کتاب اومده نیاز پیدا می‌کنید.
            از این لینک می‌تونید کتاب رو تهیه کنید.
          </Typography>
          <Button variant='contained' sx={{ width: 160 }}>
            {'خرید کتاب'}
          </Button>
        </Stack>
        <AshbariaPoster width={140} />
      </Stack>

      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={() => setSearchParams({ page: "2" })}>
          {'بازگشت'}
        </Button>
        <Button onClick={() => setSearchParams({ page: "3" })}>
          {'بعدی'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default IntroductionPage3;
