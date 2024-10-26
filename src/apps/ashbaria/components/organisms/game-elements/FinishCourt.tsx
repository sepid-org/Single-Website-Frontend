import { useFinishCourtMutation } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, useEffect } from "react";
import CustomPaper from "../../atoms/CustomPaper";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import { Paper, Stack, Typography } from "@mui/material";
import { Gold } from "apps/ashbaria/constants/colors";
import ScoreChip from "../../molecules/chips/Score";
import SupportChip from "../../molecules/chips/Support";

type FinishCourtPropsType = {
  fsmId: string;
}

const FinishCourt: FC<FinishCourtPropsType> = ({
  fsmId,
}) => {
  const [finishCourt, result] = useFinishCourtMutation();
  const { } = useGetMyBalancesQuery();

  useEffect(() => {
    finishCourt({ fsmId });
  }, [])

  return (
    <Stack
      width={360}
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
        <SupportChip value="+75" />
        <ScoreChip value="+128" />
      </Stack>

    </Stack>
  )
}

export default FinishCourt;