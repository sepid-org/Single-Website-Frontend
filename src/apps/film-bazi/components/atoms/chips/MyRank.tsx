import { Stack, Typography } from "@mui/material"
import React from "react"
import StarIcon from "../icons/StarIcon"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomChip from "./CustomChip"
import { useGetMyRankQuery } from "commons/redux/apis/bank/MyInfo"
import { FILMBAZI_COIN } from "apps/film-bazi/constants/game"
import RankingIcon from "../icons/Ranking"

const MyRankChip = ({ }) => {
  const { data: rank } = useGetMyRankQuery({ currencyName: FILMBAZI_COIN });

  return (
    <CustomChip>
      <Typography fontWeight={700} fontSize={18}>
        {'رتبه من'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(rank?.rank || '-')}
        </Typography>
        <RankingIcon />
      </Stack>
    </CustomChip >
  )
}

export default MyRankChip;