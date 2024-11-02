import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC, Fragment } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";
import AshbariaPoster from "apps/ashbaria/components/atoms/icons/AshbariaPoster";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

type IntroductionPage3PropsType = {}

const IntroductionPage3: FC<IntroductionPage3PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const localNavigate = useLocalNavigate();

  return (
    <Fragment>
      <Stack direction={'row'} spacing={2} alignItems={'start'}>
        <Stack spacing={2} alignItems={'start'} justifyContent={'space-between'}>
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
        <Button onClick={() => {
          localNavigate('/');
          localStorage.setItem('hasSeenWhatHappenedPage', 'true');
        }}>
          {'بعدی'}
        </Button>
      </Stack>
    </Fragment>
  );
};

export default IntroductionPage3;
