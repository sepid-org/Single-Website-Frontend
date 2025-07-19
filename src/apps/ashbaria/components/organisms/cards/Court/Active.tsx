import { Box, Paper, Stack, Typography } from "@mui/material";
import { CourtType } from "apps/ashbaria/types";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import { toPersianNumber } from "commons/utils/translateNumber";
import VerifyIcon from "../../../atoms/icons/Verify";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import { ASHBARIA_SURVEY_CORRESPONDING_FSM_ID } from "apps/ashbaria/constants/game-info";

type PropsType = {
  court: CourtType;
}

const ActiveCourtCard: FC<PropsType> = ({
  court,
}) => {
  const [startFSM1] = useStartFSM({ fsmId: court.corresponding_fsm, redirectPath: `/program/ashbaria/court/${court.corresponding_fsm}/` });
  const [startFSM2] = useStartFSM({ fsmId: court.corresponding_fsm, redirectPath: `/program/ashbaria/survey/` });

  const handleEnter = () => {
    if (court.corresponding_fsm === ASHBARIA_SURVEY_CORRESPONDING_FSM_ID) {
      startFSM2({});
    } else {
      startFSM1({})
    }
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
        userSelect: 'none'
      }}
      onClick={handleEnter}
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
        <Typography
          fontSize={10}
          fontWeight={400}
          color={Golden}
          textAlign={'center'}
          sx={{ userSelect: 'none' }}
        >
          {'دادگاه'}
        </Typography>
        <Typography
          fontSize={12}
          fontWeight={600}
          textAlign={'center'}
          sx={{ userSelect: 'none' }}
        >
          {court.title}
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography
            fontSize={10}
            fontWeight={800}
            sx={{ userSelect: 'none' }}
          >
            {toPersianNumber(court.reward_score)}
          </Typography>
          <VerifyIcon size={20} />
        </Stack>
      </Stack>
    </Box >
  )
}

export default ActiveCourtCard;