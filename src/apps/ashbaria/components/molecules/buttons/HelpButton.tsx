import { Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import InfoIcon from '../../atoms/icons/Info';
import useStartFSM from 'commons/hooks/fsm/useStartFSM';

type PropsType = {}

const GAME_HELP_FSM_ID = 217;

const HelpButton: FC<PropsType> = () => {
  const [startFSM, startFSMResult] = useStartFSM({ fsmId: GAME_HELP_FSM_ID, redirectPath: `/program/ashbaria/court/${GAME_HELP_FSM_ID}/` });

  const handleClick = () => {
    startFSM({});
  }

  return (
    <Button
      sx={{ background: '#00000066' }}
      fullWidth variant='contained'
      onClick={handleClick}
    >
      <Stack spacing={0.5} alignItems={'center'} justifyContent={'center'} direction={'row'}>
        <InfoIcon />
        <Typography fontWeight={600} fontSize={18} color={'white'}>
          {'راهنمای بازی'}
        </Typography>
      </Stack>
    </Button>
  );
}

export default HelpButton;
