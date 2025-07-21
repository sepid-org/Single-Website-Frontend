import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import InfoIcon from '../../atoms/icons/Info';
import useEnterFSM from 'commons/hooks/fsm/useEnterFSM';

type PropsType = {}

const GAME_HELP_FSM_ID = 217;

const HelpButton: FC<PropsType> = () => {
  const [enterFSM] = useEnterFSM({ fsmId: GAME_HELP_FSM_ID, redirectPath: `/program/ashbaria/court/${GAME_HELP_FSM_ID}/` });

  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  useEffect(() => {
    // Check if the button has already been clicked
    const hasClicked = localStorage.getItem('helpButtonClicked');
    if (!hasClicked) {
      setIsBlinking(true);
    }
  }, []);

  const handleClick = () => {
    enterFSM();
    setIsBlinking(false);
    localStorage.setItem('helpButtonClicked', 'true');
  };

  return (
    <Button
      sx={{
        background: '#00000066',
        animation: isBlinking ? 'blinking 1s infinite' : 'none',
        '@keyframes blinking': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      }}
      fullWidth
      variant='contained'
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
