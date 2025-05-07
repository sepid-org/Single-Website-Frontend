import { Box, Stack } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useLocalNavigate from '../hooks/useLocalNavigate';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import MyTotalScoreChip from '../components/molecules/chips/MyTotalScore';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';
import FullScreenBackgroundImage from '../../../commons/components/molecules/FullScreenBackgroundImage';
import useGetGameMenuComplementaryWidgets from '../hooks/useGetGameMenuComplementaryWidgets';
import GameMenuPanel from '../components/organisms/GameMenuPanel';
import HelpButton from '../components/molecules/buttons/HelpButton';
import { MediaUrls } from '../constants/mediaUrls';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = () => {
  const localNavigate = useLocalNavigate();
  const { complementaryObjects } = useGetGameMenuComplementaryWidgets();

  const fsmId = process.env.NODE_ENV === 'development' ? 6 : 214;
  const fsmStateId = process.env.NODE_ENV === 'development' ? '318' : '19870';

  useEffect(() => {
    const hasSeenPage = localStorage.getItem('hasSeenWhatHappenedPage');
    if (!hasSeenPage) {
      localNavigate('/introduction/');
    }
  }, []);

  return (
    <FullScreenBackgroundImage image={MediaUrls.WALL} styles={{ padding: 0, overflow: 'hidden' }}>
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
            boardHeight={2300}
            fsmStateId={fsmStateId}
          />
        </FSMStateProvider>
      </FSMProvider>
      <Stack
        sx={(theme) => ({
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          transform: 'scale(1)',
          transformOrigin: 'top right',
          [theme.breakpoints.up('lg')]: {
            transform: 'scale(1.3)',
          },
          [theme.breakpoints.down('md')]: {
            transform: 'scale(0.7)',
          },
          [theme.breakpoints.down('sm')]: {
            transform: 'scale(0.6)',
          },
        })}
        spacing={1}
        position={'absolute'}
        right={10} top={10}
      >
        <MyTotalScoreChip />
        <HelpButton />
      </Stack>
      <Box top={10} left={0} position={'absolute'}>
        <GameMenuPanel />
      </Box>
    </FullScreenBackgroundImage>
  );
}

export default GameMenu;
