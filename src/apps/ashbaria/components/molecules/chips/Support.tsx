import React, { FC } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { toPersianNumber } from "commons/utils/translateNumber";
import LikeIcon from "../../atoms/icons/LikeIcon";

type SupportChipPropsType = {
  value: number;
}

const SupportChip: FC<SupportChipPropsType> = ({
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
        <Typography fontSize={16} fontWeight={800}>
          {`${toPersianNumber(value)} ${value >= 0 ? '+' : '-'}`}
        </Typography> :
        <Skeleton variant="rounded" width={50} height={24} />
      }
      <LikeIcon />
    </Stack>
  )
}

export default SupportChip;

