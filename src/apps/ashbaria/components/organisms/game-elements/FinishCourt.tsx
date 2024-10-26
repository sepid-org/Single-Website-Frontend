import { useFinishCourtMutation, useGetCourtsQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, useEffect } from "react";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import { Paper, Stack, Typography } from "@mui/material";
import { Gold } from "apps/ashbaria/constants/colors";
import MyLastSupportInFSM from "../../molecules/chips/MyLastSupportInFSM";
import { useParams } from "react-router-dom";
import useFinishFSM from "commons/hooks/useFinishFSM";
import MyLastScoreInFSM from "../../molecules/chips/MyLastScoreInFSM";

type FinishCourtPropsType = {}

const FinishCourt: FC<FinishCourtPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const { finishFSM, result: finishFSMResult } = useFinishFSM();

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
        <MyLastSupportInFSM />
        <MyLastScoreInFSM />
      </Stack>

    </Stack>
  )
}

export default FinishCourt;