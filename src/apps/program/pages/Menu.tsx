import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import SimpleMenu from 'apps/program/pages/SimpleMenu';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';

import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetCurrentUserPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';

import { FSMProvider } from 'commons/hooks/useFSMContext';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';

type ProgramProps = {};

const Menu: FC<ProgramProps> = () => {
  const { programSlug } = useParams<{ programSlug: string }>();
  const { width, height } = useWindowDimensions();

  const {
    data: program,
    isLoading: isProgramLoading,
  } = useGetProgramQuery({ programSlug });

  const {
    data: player,
    isLoading: isPlayerLoading,
  } = useGetCurrentUserPlayerQuery(
    { fsmId: program?.menu },
    { skip: !program?.menu }
  );

  const isLoading = isProgramLoading || isPlayerLoading;

  // Determine mode based on aspect ratio
  const mode = width > height ? 'fit-height' : 'fit-width';

  if (isLoading) {
    return null;
  }

  // FSM Menu:
  if (program?.menu && player?.current_state) {
    return (
      <FSMProvider fsmId={program.menu}>
        <FSMStateProvider
          isMentor={false}
          fsmStateId={player.current_state}
        >
          <BoardFSMState
            mode={mode}
            fsmStateId={player.current_state}
          />
        </FSMStateProvider>
      </FSMProvider>
    );
  }

  return <SimpleMenu />;
};

export default Menu;