import React, { FC } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import VerifyIcon from "../../atoms/icons/Verify";
import { toPersianNumber } from "commons/utils/translateNumber";

type ScoreChipPropsType = {
  value: number;
}

const ScoreChip: FC<ScoreChipPropsType> = ({
  value,
}) => {
  return (
    <Stack
      sx={{
        background: '#00000080'
      }}
      component={Paper}
      padding={1}
      paddingBottom={0.5}
      paddingX={2}
      borderRadius={3}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={0.5}
    >
      <Typography fontSize={16} fontWeight={800}>
        {toPersianNumber(value)}
      </Typography>
      <VerifyIcon />
    </Stack>
  )
}

export default ScoreChip;