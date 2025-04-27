import React, { FC } from 'react';
import EventProgram from 'apps/program/template/EventProgram';
import PrivateProgramPageWrapper from 'apps/program/template/PrivateProgramPageWrapper';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  // TODO: a lot of TOF (just is config for OliveSchool)
  if (program?.menu_first_state) {
    return (
      <FSMStateProvider
        isMentor={false}
        fsmStateId={program.menu_first_state}
      >
        <BoardFSMState
          mode='fit-width'
          boardWidth={900}
          boardHeight={1600}
          fsmStateId={program.menu_first_state}
        />
      </FSMStateProvider>
    );
  }

  return (
    <PrivateProgramPageWrapper>
      <EventProgram />
    </PrivateProgramPageWrapper>
  )
}

export default Program;
