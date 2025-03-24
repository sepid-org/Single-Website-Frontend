import React from "react";
import { Typography, Stack } from "@mui/material";
import { toPersianNumber } from 'commons/utils/translateNumber';
import GoldenStarIcon from "../atoms/GoldenStarIcon";

const TableRecord = ({ rank, name, score, currentUser }) => {
  const conditionalUserBackground = currentUser ?
    "linear-gradient(180deg, #BBD043 0%, #BBD043 100%)" :
    "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(128, 128, 128, 0.2) 100%)";

  return (
    <Stack width={'100%'} direction={'row'} justifyContent={'center'} spacing={1}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          minWidth: 60,
          height: 60,
          position: 'relative',
          borderRadius: '50%',
          background: conditionalUserBackground,
        }}
      >
        <Typography fontWeight={'bold'}>
          {toPersianNumber(rank) || '-'}
        </Typography>
      </Stack>
      <Stack
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderRadius={32}
        height={60}
        padding={2}
        paddingX={3}
        sx={{ background: conditionalUserBackground }}
      >
        <Typography
          fontSize={18}
          fontWeight={400}
          overflow={'hidden'}
          whiteSpace={'normal'}
          textOverflow={'ellipsis'}
        >
          {name}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
          <Typography fontSize={18} fontWeight={400}>
            {toPersianNumber(score)}
          </Typography>
          <GoldenStarIcon />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TableRecord;