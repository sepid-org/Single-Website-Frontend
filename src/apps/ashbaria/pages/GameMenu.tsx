import { Box, Stack } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { Helmet } from "react-helmet";

import backgroundImg from "../assets/profileBackground.svg";
import useLocalNavigate from '../hooks/useLocalNavigate';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import MyTotalScoreChip from '../components/molecules/chips/MyTotalScore';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';
import FullScreenBackgroundImage from '../components/molecules/FullScreenBackgroundImage';
import useGetGameMenuComplementaryWidgets from '../hooks/useGetGameMenuComplementaryWidgets';
import GameMenuPanel from '../components/organisms/GameMenuPanel';
import HelpButton from '../components/molecules/buttons/HelpButton';

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
    <FullScreenBackgroundImage image={backgroundImg} styles={{ padding: 0 }}>
      <Helmet>
        <title>{'راز آشباریا'}</title>
      </Helmet>
      <FSMProvider
        player={null}
        fsmId={fsmId}
      >
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
      <Stack spacing={1} position={'absolute'} right={10} top={10}>
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
