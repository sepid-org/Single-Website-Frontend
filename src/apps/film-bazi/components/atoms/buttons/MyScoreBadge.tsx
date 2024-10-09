import { Stack, Typography } from "@mui/material"
import React from "react"
import StarIcon from "../icons/StarIcon"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import useGetMyBalances from "apps/film-bazi/hooks/useGetMyBalances"
import CustomBadge from "../CustomBadge"
import { GAME_CURRENCY_NAME } from "apps/film-bazi/constants/game"

const MyScoreBadge = ({ }) => {
  const { balances, loading } = useGetMyBalances();
  const score = balances[GAME_CURRENCY_NAME] || 0;

  return (
    <CustomBadge>
      <Typography fontWeight={700} fontSize={18}>
        {'امتیاز من'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(score)}
        </Typography>
        <StarIcon />
      </Stack>
    </CustomBadge >
  )
}

export default MyScoreBadge;