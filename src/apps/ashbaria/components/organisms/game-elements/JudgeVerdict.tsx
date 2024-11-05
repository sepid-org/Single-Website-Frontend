import { useGetCourtsQuery } from "apps/ashbaria/redux/slices/GameLogics";
import React, { FC } from "react";
import { Skeleton, Typography } from "@mui/material";
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
    <Typography variant='h3' textAlign={'justify'} color={'black'}>
      {finalSupportPercentage >= 50 ?
        currentCourt?.judge_verdict1 :
        currentCourt?.judge_verdict2 || 'ادله‌ی کافی برای اثبات اتمام وجود ندارد.'
      }
    </Typography>
  )
}

export default JudgeVerdict;