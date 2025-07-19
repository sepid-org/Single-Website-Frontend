import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomChip from "./CustomChip"
import { FILMBAZI_COIN } from "apps/film-bazi/constants/game"
import { useGetMyBalancesQuery, useGetMyRankQuery } from "commons/redux/apis/bank/MyInfo"
import StarIcon from "../icons/StarIcon"
import MoneyIcon from "../icons/MoneyIcon"
import RankingIcon from "../icons/Ranking"
import { useGetCapitalQuery } from "apps/film-bazi/redux/slices/Capital"

const MyInfoChip = ({ }) => {
  const { data: balances } = useGetMyBalancesQuery();
  const { data: myCapital } = useGetCapitalQuery();
  const { data: rank } = useGetMyRankQuery({ currencyName: FILMBAZI_COIN });
  const score = balances?.[FILMBAZI_COIN] || 0;

  return (
    <CustomChip>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(rank?.rank || '-')}
        </Typography>
        <RankingIcon />
      </Stack>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(myCapital)}
        </Typography>
        <MoneyIcon width={24} />
      </Stack>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(score)}
        </Typography>
        <StarIcon />
      </Stack>
    </CustomChip >
  )
}

export default MyInfoChip;