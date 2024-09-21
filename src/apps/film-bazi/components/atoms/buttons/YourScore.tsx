import { Stack, Typography } from "@mui/material"
import React from "react"
import StarIcon from "../icons/StarIcon"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"

const YourScore = ({ score = 1085 }) => {

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        background: '#00000033',
        paddingX: 2,
        paddingY: 1,
        borderRadius: 2,
      }}>
      <Typography fontWeight={700} fontSize={18}>
        {'امتیاز تو'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(score)}
        </Typography>
        <StarIcon />
      </Stack>
    </Stack>
  )
}

export default YourScore;