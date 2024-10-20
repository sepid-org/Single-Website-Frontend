import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomBadge from "./CustomBadge"
import { FILMBAZI_COIN } from "apps/film-bazi/constants/game"
import { useGetMyBalancesQuery } from "commons/redux/slices/my-info/MyInfo"
import StarIcon from "./icons/StarIcon"

const MyScoresBadge = ({ }) => {
  const { data: balances } = useGetMyBalancesQuery();
  const score = balances?.[FILMBAZI_COIN] || 0;

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

export default MyScoresBadge;