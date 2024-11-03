import React, { FC, Fragment } from "react";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { toPersianNumber } from "commons/utils/translateNumber";
import LikeIcon from "../../atoms/icons/LikeIcon";
import DislikeIcon from "../../atoms/icons/DislikeIcon";

type SupportPercentageChipPropsType = {
  value: number;
  isFetching?: boolean;
}

const SupportPercentageChip: FC<SupportPercentageChipPropsType> = ({
  value,
  isFetching,
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
      {isFetching || value === null ?
        <Skeleton variant="rounded" width={70} height={36} /> :
        <Fragment>
          <Typography fontSize={24} fontWeight={800} sx={{ direction: 'rtl' }}>
            {`${value > 0 ? ' +' : ''} ${toPersianNumber(value)}`}
          </Typography>
          {value >= 0 ? <LikeIcon /> : <DislikeIcon />}
        </Fragment>
      }
    </Stack>
  )
}

export default SupportPercentageChip;

