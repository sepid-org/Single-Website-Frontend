import { useGetCourtsQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetCourtFinalSupportPercentage from "apps/ashbaria/hooks/useGetCourtFinalSupportPercentage";

type PropsType = {}

const JudgeVerdict: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: courts } = useGetCourtsQuery();
  const currentCourt = courts?.find(court => court.corresponding_fsm === fsmId);

  const finalSupportPercentage = useGetCourtFinalSupportPercentage(fsmId);

  if (finalSupportPercentage === undefined) {
    return (
      <Skeleton variant='rounded' height={'100%'} width={'100%'} />
    )
  }

  return (
    <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant='h3' color={'black'} lineHeight={1.5}>
        {finalSupportPercentage >= 50 ?
          currentCourt?.judge_verdict1 :
          currentCourt?.judge_verdict2 || 'ادله‌ی کافی برای اثبات اتهام وجود ندارد.'
        }
      </Typography>
    </Stack>
  )
}

export default JudgeVerdict;