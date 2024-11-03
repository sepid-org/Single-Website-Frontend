import { useFinishCourtMutation, useGetCourtsQuery, useGetUserLastSupportPercentageInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC, Fragment, useEffect } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { Golden } from "apps/ashbaria/constants/colors";
import MyLastSupportPercentageInCourt from "../../molecules/chips/MyLastSupportPercentageInCourt";
import { useParams } from "react-router-dom";
import useFinishFSM from "commons/hooks/fsm/useFinishFSM";
import MyLastScoreInCourt from "../../molecules/chips/MyLastScoreInCourt";

type FinishCourtPropsType = {}

const FinishCourt: FC<FinishCourtPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const [finishCourt, finishCourtResult] = useFinishCourtMutation();
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId });
  const { data: supportPercentage } = useGetUserLastSupportPercentageInCourtQuery({ correspondingFsmId: fsmId })
  const { data: courts } = useGetCourtsQuery();

  const currentCourt = courts?.find(court => court.corresponding_fsm === fsmId);

  const handleFinishCourt = () => {
    finishCourt({ fsmId });
  }

  useEffect(() => {
    if (finishCourtResult.isSuccess) {
      finishFSM();
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

      <Typography color={Golden} variant="h4">
        {'اتمام پرونده'}
      </Typography>

      <Typography variant="h4" textAlign={'center'}>
        {currentCourt?.judge_verdict}
      </Typography>

      <Fragment>
        <Typography color={Golden} variant="h4">
          {'نتیجه'}
        </Typography>

        <Stack direction={'row'} spacing={2}>
          <MyLastSupportPercentageInCourt />
          <MyLastScoreInCourt />
        </Stack>
      </Fragment>

      <Button onClick={handleFinishCourt} variant='contained'>
        {'پایان دادگاه'}
      </Button>
    </Stack>
  )
}

export default FinishCourt;