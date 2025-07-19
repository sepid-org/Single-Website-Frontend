import React, { FC, Fragment } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { toPersianNumber } from "commons/utils/translateNumber";
import LikeIcon from "../../atoms/icons/LikeIcon";
import DislikeIcon from "../../atoms/icons/DislikeIcon";

type SupportPercentageChipPropsType = {
  value: number;
  isLoading?: boolean;
}

const SupportPercentageChip: FC<SupportPercentageChipPropsType> = ({
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
      paddingBottom={1.4}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={1}
    >
      {isLoading || value === null ?
        <Skeleton variant="rounded" width={70} height={36} /> :
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} paddingBottom={0.2}>
          <Typography fontSize={24} fontWeight={800} sx={{ direction: 'rtl', paddingTop: 1.2 }}>
            ٪{toPersianNumber(value)}
          </Typography>
          {value >= 0 ? <LikeIcon /> : <DislikeIcon />}
        </Stack>
      }
    </Stack>
  )
}

export default SupportPercentageChip;

