import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import { FILMBAZI_EXTRA_CHANCE } from "apps/film-bazi/constants/game"
import CustomBadge from "./CustomBadge"
import useGetMyDiscountCodes from "apps/film-bazi/hooks/useGetMyDiscountCodes"
import StarIcon from "./icons/StarIcon"
import { useGetMyBalancesQuery } from "commons/redux/slices/my-info/MyInfo"

const MyChancesBadge = ({ }) => {
  const { discountCodes } = useGetMyDiscountCodes();
  const { data: balances } = useGetMyBalancesQuery();
  const extraChances = balances?.[FILMBAZI_EXTRA_CHANCE] || 0;

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