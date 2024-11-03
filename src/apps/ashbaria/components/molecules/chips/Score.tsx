import React, { FC, Fragment } from "react";
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
      borderRadius={3}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={0.5}
    >
      {isLoading || value === null ?
        <Skeleton variant="rounded" width={70} height={36} /> :
        <Fragment>
          <Typography fontSize={24} fontWeight={800}>
            {toPersianNumber(value) + (value > 0 ? "+" : '')}
          </Typography>
          <VerifyIcon />
        </Fragment>
      }
    </Stack>
  )
}

export default ScoreChip;

