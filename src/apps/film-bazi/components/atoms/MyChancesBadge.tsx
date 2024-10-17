import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import useGetMyBalances from "apps/film-bazi/hooks/useGetMyBalances"
import { GAME_EXTRA_CHANCE_NAME } from "apps/film-bazi/constants/game"
import CustomBadge from "./CustomBadge"
import useGetMyDiscountCodes from "apps/film-bazi/hooks/useGetMyDiscountCodes"
import StarIcon from "./icons/StarIcon"

const MyChancesBadge = ({ }) => {
  const { discountCodes } = useGetMyDiscountCodes();
  const { balances } = useGetMyBalances();
  const extraChances = balances[GAME_EXTRA_CHANCE_NAME] || 0;

  const myDiscountCodeUsages = discountCodes
    .map(discountCode => discountCode.usage_count)
    .reduce((acc, curr) => acc + curr, 0)

  return (
    <CustomBadge>
      <Typography fontWeight={700} fontSize={18}>
        {'فرصت بازی'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(myDiscountCodeUsages + extraChances)}
        </Typography>
        <StarIcon />
      </Stack>
    </CustomBadge >
  )
}

export default MyChancesBadge;