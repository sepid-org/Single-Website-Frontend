import { Stack, Typography } from "@mui/material"
import React from "react"
import { toPersianNumber } from "commons/utils/translateNumber"
import { Golden } from "apps/film-bazi/constants/colors"
import CustomChip from "./CustomChip"
import MoneyIcon from "../icons/MoneyIcon"
import { useGetCapitalQuery } from "apps/film-bazi/redux/slices/Capital"

const MyCapitalChip = ({ }) => {
  const { data: myCapital } = useGetCapitalQuery();

  return (
    <CustomChip>
      <Typography fontWeight={700} fontSize={18}>
        {'سرمایه من'}
      </Typography>
      <Stack direction={'row'} spacing={0.5}>
        <Typography fontWeight={600} fontSize={16} color={Golden}>
          {toPersianNumber(myCapital)}
        </Typography>
        <MoneyIcon />
      </Stack>
    </CustomChip >
  )
}

export default MyCapitalChip;