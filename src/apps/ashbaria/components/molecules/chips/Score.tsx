import React, { FC } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
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
        backgroundColor: "#00000080",
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      component={Paper}
      padding={1}
      paddingX={2}
      borderRadius={3}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={0.5}
    >
      {value !== null ?
        <Typography fontSize={24} fontWeight={800}>
          {toPersianNumber(value) + "+"}
        </Typography> :
        <Skeleton variant="rounded" width={50} height={24} />
      }
      <VerifyIcon />
    </Stack>
  )
}

export default ScoreChip;

