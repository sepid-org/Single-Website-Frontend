import React, { FC } from "react";
import ScoreChip from "./Score";
import { useGetMyBalancesQuery } from "commons/redux/slices/my-info/MyInfo";
import { ASHBARIA_COIN } from "apps/ashbaria/constants/game-info";

type MyScoreChipPropsType = {}

const MyScoreChip: FC<MyScoreChipPropsType> = ({ }) => {
  const { data: myBalances } = useGetMyBalancesQuery();
  const myScore = myBalances?.[ASHBARIA_COIN] || 0;

  return (
    <ScoreChip value={myScore} />
  )
}

export default MyScoreChip;