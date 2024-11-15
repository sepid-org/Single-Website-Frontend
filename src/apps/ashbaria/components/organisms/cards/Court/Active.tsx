import { Box, Paper, Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import { toPersianNumber } from "commons/utils/translateNumber";
import VerifyIcon from "../../../atoms/icons/Verify";
import useStartFSM from "commons/hooks/fsm/useStartFSM";

type PropsType = {
  court: CourtType;
}

const ActiveCourtCard: FC<PropsType> = ({
  court,
}) => {
  const [_startFSM, startFSMResult] = useStartFSM({ fsmId: court.corresponding_fsm, redirectPath: `/program/ashbaria/court/${court.corresponding_fsm}/` });

  const startFSM = () => {
    _startFSM({})
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={startFSM}
    >
      <Stack
        width={'100%'}
        height={'100%'}
        component={Paper}
        alignItems="center"
        justifyContent="center"
        spacing={1}
        p={1}
        sx={{
          border: '2px solid transparent',
          borderRadius: 2,
          backgroundClip: 'padding-box',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: '-3px',
            borderRadius: 'inherit',
            background: 'linear-gradient(180deg, #FFEC88 100%, #FFA95A 100%)',
            zIndex: -1,
          }
        }}
      >
        <Typography fontSize={10} fontWeight={400} color={Golden} textAlign={'center'}>
          {'دادگاه'}
        </Typography>
        <Typography fontSize={12} fontWeight={600} textAlign={'center'}>
          {court.title}
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography fontSize={10} fontWeight={800}>
            {toPersianNumber(court.reward_score)}
          </Typography>
          <VerifyIcon size={20} />
        </Stack>
      </Stack>
    </Box >
  )
}

export default ActiveCourtCard;