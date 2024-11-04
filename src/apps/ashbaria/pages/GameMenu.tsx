import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Helmet } from "react-helmet";

import backgroundImg from "../assets/profileBackground.svg";
import useLocalNavigate from '../hooks/useLocalNavigate';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import MyTotalScoreChip from '../components/molecules/chips/MyTotalScore';
import MyFirstName from '../components/molecules/chips/MyFirstName';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import useGetGameMenuComplementaryWidgets from '../hooks/useGetGameMenuComplementaryWidgets';
import useLogout from 'commons/hooks/useLogout';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = () => {
  const localNavigate = useLocalNavigate();
  const { complementaryObjects } = useGetGameMenuComplementaryWidgets();
  const { logout } = useLogout();

  const fsmId = process.env.NODE_ENV === 'development' ? 6 : 214;
  const fsmStateId = process.env.NODE_ENV === 'development' ? '318' : '19870';

  useEffect(() => {
    const hasSeenPage = localStorage.getItem('hasSeenWhatHappenedPage');
    if (!hasSeenPage) {
      localNavigate('/introduction/');
    }
  }, []);

  return (
    <FullScreenBackgroundImage image={backgroundImg} styles={{ padding: 0 }}>
      <Helmet>
        <title>{'راز آشباریا'}</title>
      </Helmet>
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider
          isMentor={false}
          complementaryObjects={complementaryObjects}
          fsmStateId={fsmStateId}
        >
          <BoardFSMState
            mode='fit-width'
            boardWidth={900}
            boardHeight={2000}
            fsmStateId={fsmStateId}
          />
        </FSMStateProvider>
      </FSMProvider>
      <Box position={'absolute'} right={10} top={10}>
        <MyTotalScoreChip />
      </Box>
      <Stack
        component={Paper}
        spacing={2}
        padding={2}
        top={10}
        left={0}
        position={'absolute'}
        alignItems={'center'}
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <ProgramLogo />
        <MyFirstName />
        <Typography textAlign={'center'}>
          {'مهلت تا پایان دوره: ۱۷ روز'}
        </Typography>
        <Button fullWidth variant='contained' onClick={() => localNavigate('/friendship-network/')}>
          {'حلقه دوستان'}
        </Button>
        <Button fullWidth variant='outlined' onClick={() => localNavigate('/profile/')}>
          {'پروفایل'}
        </Button>
        <Button variant='outlined' onClick={() => logout()}>
          {'خروج'}
        </Button>
      </Stack>
    </FullScreenBackgroundImage>
  );
}

export default GameMenu;
