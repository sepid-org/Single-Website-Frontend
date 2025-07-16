import React, { FC } from 'react';
import EventProgram from 'apps/program/template/EventProgram';
import PrivateProgramPageWrapper from 'apps/program/template/PrivateProgramPageWrapper';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import { useGetCurrentUserPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';

type ProgramPropsType = {};

const Program: FC<ProgramPropsType> = () => {
  const { programSlug } = useParams<{ programSlug: string }>();
  const { width, height } = useWindowDimensions();

  const {
    data: program,
    isLoading: isGetProgramLoading,
  } = useGetProgramQuery({ programSlug });

  const {
    data: player,
    isLoading: isGetCurrentUserPlayerLoading,
  } = useGetCurrentUserPlayerQuery(
    { fsmId: program?.menu },
    { skip: !Boolean(program?.menu) }
  );

  const isLoading = isGetProgramLoading || isGetCurrentUserPlayerLoading;

  // Determine mode based on aspect ratio
  const mode = width > height ? 'fit-height' : 'fit-width';

  return (
    <PrivateProgramPageWrapper>
      {isLoading ? null :
        program?.menu && player?.current_state ? (
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
        ) : (
          <EventProgram />
        )
      }
    </PrivateProgramPageWrapper>
  );
};

export default Program;