import React, { FC } from "react";
import ScoreBadge from "./Score";
import { useGetMyBalancesQuery } from "commons/redux/slices/my-info/MyInfo";
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";

type ScoreBadgePropsType = {}

const MyScoreBadge: FC<ScoreBadgePropsType> = ({ }) => {
  const { data: myBalances } = useGetMyBalancesQuery();
  const myScore = myBalances?.[ASHBARIA_COIN] || 0;

  return (
    <ScoreBadge value={myScore} />
  )
}

export default MyScoreBadge;