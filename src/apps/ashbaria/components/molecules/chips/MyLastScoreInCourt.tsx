import React, { FC } from "react";
import ScoreChip from "./Score";
import { useParams } from "react-router-dom";
import { useGetUserLastScoreInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";

type PropsType = {}

const MyLastScoreInCourt: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data, isFetching } = useGetUserLastScoreInCourtQuery({ correspondingFsmId: fsmId })

  return (
    <ScoreChip value={data} isFetching={isFetching} />
  )
}

export default MyLastScoreInCourt;