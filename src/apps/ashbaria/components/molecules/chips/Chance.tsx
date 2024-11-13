import React, { FC, Fragment } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import VerifyIcon from "../../atoms/icons/Verify";
import { toPersianNumber } from "commons/utils/translateNumber";
import StarIcon from "../../atoms/icons/Star";

type ScoreChipPropsType = {
  value: number;
  isLoading?: boolean;
}

const ChanceChip: FC<ScoreChipPropsType> = ({
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
      spacing={1}
    >
      {isLoading || value === null ?
        <Skeleton variant="rounded" width={70} height={36} /> :
        <Fragment>
					<StarIcon />
          <Typography fontSize={24} fontWeight={800} sx={{ direction: 'rtl' }}>
            {(value > 0 ? "+" : '') + toPersianNumber(value) + "شانس"}
          </Typography>
        </Fragment>
      }
    </Stack>
  )
}

export default ChanceChip;