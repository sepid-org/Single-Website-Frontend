import React, { FC } from "react";
import ScoreChip from "./Score";
import { useParams } from "react-router-dom";
import { useGetUserLastResultInFSMQuery } from "apps/ashbaria/redux/slices/GameLogics";

type MyLastScoreInFSMPropsType = {}

const MyLastScoreInFSM: FC<MyLastScoreInFSMPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data, isLoading } = useGetUserLastResultInFSMQuery({ correspondingFsmId: fsmId })

  return (
    <ScoreChip value={data?.score} isLoading={isLoading} />
  )
}

export default MyLastScoreInFSM;