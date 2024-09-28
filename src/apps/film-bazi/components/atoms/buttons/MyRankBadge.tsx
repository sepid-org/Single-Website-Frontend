import { Stack, Typography } from "@mui/material"
import React from "react"
import StarIcon from "../icons/StarIcon"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomBadge from "../CustomBadge"
import useGetMyRank from "apps/film-bazi/hooks/useGetMyRank"

const MyRankBadge = ({ }) => {
  const { rank } = useGetMyRank();

  return (
    <CustomBadge>
      <Typography fontWeight={700} fontSize={18}>
        {'رتبه من'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(rank?.rank || '-')}
        </Typography>
        <StarIcon />
      </Stack>
    </CustomBadge >
  )
}

export default MyRankBadge;