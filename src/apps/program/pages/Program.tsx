import React, { FC } from 'react';
import EventProgram from 'apps/program/template/EventProgram';
import PrivateProgramPageWrapper from 'apps/program/template/PrivateProgramPageWrapper';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';
import { FSMProvider } from 'commons/hooks/useFSMContext';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  // TODO: a lot of TOF (just is config for OliveSchool). It should be got from state dimensions
  // Board dimensions (configurable)
  const boardWidth = 900;
  const boardHeight = 1600;

  // Determine mode based on aspect ratio
  const { width, height } = useWindowDimensions();
  const mode = width > height ? 'fit-height' : 'fit-width';

  if (program?.menu_first_state_id) {
    return (
      <FSMProvider fsmId={program.menu}>
        <FSMStateProvider
          isMentor={false}
          fsmStateId={program.menu_first_state_id}
        >
          <BoardFSMState
            mode={mode}
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            fsmStateId={program.menu_first_state_id}
          />
        </FSMStateProvider>
      </FSMProvider>
    );
  }

  return (
    <PrivateProgramPageWrapper>
      <EventProgram />
    </PrivateProgramPageWrapper>
  );
};

export default Program;
