import { Paper, Stack, Typography, Box } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import { toPersianNumber } from "commons/utils/translateNumber";
import VerifyIcon from "../../atoms/icons/Verify";

type DisabledCourtCardPropsType = {
  court: CourtType;
};

const DisabledCourtCard: FC<DisabledCourtCardPropsType> = ({
  court,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'not-allowed',
        opacity: 0.6,
        transition: 'transform 0.2s ease',
      }}
      onClick={undefined}
    >
      <Stack
        width={'100%'}
        height={'100%'}
        component={Paper}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        padding={1}
      >
        <Typography fontSize={12} fontWeight={400} color={Golden}>
          {'دادگاه'}
        </Typography>
        <Typography>{court.title}</Typography>
        <Stack alignItems={'center'} direction={'row'}>
          <Typography fontSize={18} fontWeight={800}>
            {toPersianNumber(court.reward_score) + "+"}
          </Typography>
          <VerifyIcon size={28} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DisabledCourtCard;
