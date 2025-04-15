import { useFinishCourtMutation, useGetCourtsQuery, useGetUserLastSupportPercentageInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, useEffect, useState } from "react";
import { Box, Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Golden } from "apps/ashbaria/constants/colors";
import MyLastSupportPercentageInCourt from "../../molecules/chips/MyLastSupportPercentageInCourt";
import { useParams } from "react-router-dom";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import MyLastScoreInCourt from "../../molecules/chips/MyLastScoreInCourt";
import useGetCourtFinalSupportPercentage from "apps/ashbaria/hooks/useGetCourtFinalSupportPercentage";
import { CourtType } from "apps/ashbaria/types";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";

const INITIAL_COURT_FSM_ID = 197;
const LAST_COURT_FSM_ID = 211;

const getDadbestanAddress = (finalSupportPercentage: number, court: CourtType) => {
  if (court.corresponding_fsm === INITIAL_COURT_FSM_ID) {
    return 'ماجرا شروع شد؛ برو بریم توی دل کار!';
  }

  if (court.corresponding_fsm === LAST_COURT_FSM_ID) {
    return 'بالاخره موفق شدی این پرونده رو با موفقیت تموم کنی. تبریک میگم! تو باعث افتخار مایی';
  }

  if (finalSupportPercentage === 0) {
    return 'ناامیدمون کردی!';
  }

  if (finalSupportPercentage > 0 && finalSupportPercentage <= 50) {
    return 'خیلی خوب پیش نرفت! امیدوارم توی دادگاه بعدی کارت بهتر باشه.';
  }

  if (finalSupportPercentage > 50 && finalSupportPercentage <= 70) {
    return 'آفرین بد نبود.';
  }

  if (finalSupportPercentage > 70 && finalSupportPercentage <= 100) {
    return 'تبریک! کارت حرف نداشت.';
  }
}

type FinishCourtPropsType = {}

const FinishCourt: FC<FinishCourtPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const fsmId = parseInt(useParams().fsmId);
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const [finishFSM, finishFSMResult] = useFinishFSM();
  const { data: courts } = useGetCourtsQuery();
  const finalSupportPercentage = useGetCourtFinalSupportPercentage(fsmId);

  const currentCourt = courts?.find(court => court.corresponding_fsm === fsmId);

  useEffect(() => {
    finishCourt({ fsmId });
    finishFSM(false);
  }, [])

  const handleGoToHome = () => {
    localNavigate(`/`);
  }

  return (
    <Stack
      height={'100%'}
      width={'100%'}
      component={Paper}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      spacing={2}
    >
      <Box paddingBottom={4}>
        {(finalSupportPercentage === undefined || currentCourt === undefined) ?
          <Skeleton variant='rounded' width={240} height={80} /> :
          <Typography color={Golden} variant="h3" textAlign={'center'} lineHeight={1.5}>
            {getDadbestanAddress(finalSupportPercentage, currentCourt)}
          </Typography>
        }
      </Box>

      <Typography variant="h5" textAlign={'center'}>
        {'عملکرد شما در این پرونده'}
      </Typography>

      <Stack direction={'row'} spacing={2}>
        <MyLastSupportPercentageInCourt forceRefetch={true} />
        <MyLastScoreInCourt />
      </Stack>

      {/* {currentCourt?.corresponding_fsm !== LAST_COURT_FSM_ID &&
        <Button fullWidth onClick={handleGoToNextCourt} variant='contained' size="large">
          {'بریم پرونده بعدی'}
        </Button>
      } */}

      <Button fullWidth onClick={handleGoToHome} variant='outlined' size="large">
        <Typography fontWeight={600} fontSize={24} color={Golden}>
          {'بازگشت به خانه'}
        </Typography>
      </Button>
    </Stack>
  )
}

export default FinishCourt;