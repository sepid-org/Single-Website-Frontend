import { useFinishCourtMutation, useGetCourtsQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, useEffect } from "react";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import { Paper, Stack, Typography } from "@mui/material";
import { Gold } from "apps/ashbaria/constants/colors";
import ScoreChip from "../../molecules/chips/Score";
import SupportChip from "../../molecules/chips/Support";
import calculateCourtFinalScore from "apps/ashbaria/utils/calculateCourtFinalScore";
import calculateCourtFinalSupportPercentage from "apps/ashbaria/utils/calculateCourtFinalSupportPercentage";

type FinishCourtPropsType = {
  fsmId: string;
}

const FinishCourt: FC<FinishCourtPropsType> = ({
  fsmId,
}) => {
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const { data: balances } = useGetMyBalancesQuery();
  const { data: courts } = useGetCourtsQuery();

  const courtFinalScore = calculateCourtFinalScore({ fsmId, balances, court: courts?.find(court => court.corresponding_fsm === parseInt(fsmId)) })
  const courtFinalSupportPercentage = calculateCourtFinalSupportPercentage({ fsmId, balances })

  useEffect(() => {
    finishCourt({ fsmId });
  }, [])

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

      <Typography color={Gold} variant="h4">
        {'اتمام پرونده'}
      </Typography>

      <Typography variant="h4" textAlign={'center'}>
        {'قاضی چلویی را در این پرونده مجرم دانست.'}
      </Typography>

      <Typography color={Gold} variant="h4">
        {'نتیجه'}
      </Typography>

      <Stack direction={'row'} spacing={2}>
        <SupportChip value={courtFinalSupportPercentage} />
        <ScoreChip value={courtFinalScore} />
      </Stack>

    </Stack>
  )
}

export default FinishCourt;