import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomChip from "./CustomChip"
import { FILMBAZI_COIN } from "apps/film-bazi/constants/game"
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo"
import StarIcon from "./icons/StarIcon"

const MyScoresChip = ({ }) => {
  const { data: balances } = useGetMyBalancesQuery();
  const score = balances?.[FILMBAZI_COIN] || 0;

  return (
    <CustomChip>
      <Typography fontWeight={700} fontSize={18}>
        {'امتیاز من'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(score)}
        </Typography>
        <StarIcon />
      </Stack>
    </CustomChip >
  )
}

export default MyScoresChip;