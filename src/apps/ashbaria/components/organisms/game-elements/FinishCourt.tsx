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

const getDadbestanAddress = (finalSupportPercentage: number, court: CourtType) => {
  if (court.corresponding_fsm === 197) {
    return 'ماجرا شروع شد؛ برو بریم توی دل کار!';
  }

  if (court.corresponding_fsm === 211) {
    return 'بالاخره موفق شدی این پرونده رو با موفقیت تموم کنی. تبریک میگم. تو باعث افتخار مایی';
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
  const [clickedButton, setClickedButton] = useState<'return-to-home' | 'go-to-next-court'>('return-to-home');
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId, navigateAfter: false });
  const { data: courts } = useGetCourtsQuery();
  const finalSupportPercentage = useGetCourtFinalSupportPercentage(fsmId);

  const currentCourt = courts?.find(court => court.corresponding_fsm === fsmId);

  const handleGoToNextCourt = () => {
    setClickedButton('go-to-next-court');
    finishCourt({ fsmId });
  }

  const handleGoToHome = () => {
    setClickedButton('return-to-home');
    finishCourt({ fsmId });
  }

  useEffect(() => {
    if (finishCourtResult.isSuccess) {
      finishFSM();
      if (clickedButton === 'return-to-home') {
        localNavigate(`/`);
      } else {
        localNavigate(`/court/${currentCourt.next_court_corresponding_fsm_id}`);
      }
    }
  }, [finishCourtResult])

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
          <Typography color={Golden} variant="h4">
            {getDadbestanAddress(finalSupportPercentage, currentCourt)}
          </Typography>
        }
      </Box>

      <Typography variant="h5">
        {'عملکرد شما در این پرونده'}
      </Typography>

      <Stack direction={'row'} spacing={2}>
        <MyLastSupportPercentageInCourt />
        <MyLastScoreInCourt />
      </Stack>

      {currentCourt.corresponding_fsm !== 211 &&
        <Button fullWidth onClick={handleGoToNextCourt} variant='contained' size="large">
          {'بریم پرونده بعدی'}
        </Button>
      }

      <Button fullWidth onClick={handleGoToHome} variant='outlined' size="large">
        {'بازگشت به خانه'}
      </Button>
    </Stack>
  )
}

export default FinishCourt;