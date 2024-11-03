import React, { FC } from "react";
import ScoreChip from "./Score";
import { useGetMyBalancesQuery } from "commons/redux/apis/bank/MyInfo";
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";

type MyTotalScorePropsType = {}

const MyTotalScore: FC<MyTotalScorePropsType> = ({ }) => {
  const { data: myBalances, isLoading } = useGetMyBalancesQuery();
  const myScore = myBalances?.[ASHBARIA_COIN] || 0;

  return (
    <ScoreChip value={myScore} isFetching={isLoading} />
  )
}

export default MyTotalScore;