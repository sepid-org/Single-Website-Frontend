import React, { FC } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import VerifyIcon from "../../atoms/icons/Verify";
import { toPersianNumber } from "commons/utils/translateNumber";

type ScoreChipPropsType = {
  value: number;
  isLoading?: boolean;
}

const ScoreChip: FC<ScoreChipPropsType> = ({
  value,
  isLoading,
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
      paddingBottom={0.5}
      borderRadius={3}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={0.5}
    >
      {isLoading || value === null ?
        <Skeleton variant="rounded" width={50} height={30} /> :
        <Typography fontSize={24} fontWeight={800}>
          {toPersianNumber(value) + "+"}
        </Typography>
      }
      <VerifyIcon />
    </Stack>
  )
}

export default ScoreChip;

