import React, { FC, useEffect, useMemo } from 'react';
import BoardFSMState from 'apps/fsm/template/FSMState/BoardFSMState';

import {
  useEnterFSMMutation,
  useGetCurrentUserPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';

import { FSMProvider } from 'commons/hooks/useFSMContext';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';

type ProgramProps = {
  menuId: number;
};

const BoardMenu: FC<ProgramProps> = ({ menuId }) => {
  const { width, height } = useWindowDimensions();

  const {
    data: existingPlayer,
    error: playerError,
    isFetching: isPlayerFetching,
  } = useGetCurrentUserPlayerQuery(
    { fsmId: menuId },
    { skip: !menuId }
  );

  const [
    enterFSM,
    { data: enteredPlayer, isLoading: isEntering, isSuccess: isEnterSuccess },
  ] = useEnterFSMMutation();

  useEffect(() => {
    const notFound =
      playerError && 'status' in playerError && playerError.status === 404;

    if (menuId && notFound && !isEntering && !isEnterSuccess) {
      enterFSM({ fsmId: menuId });
    }
  }, [menuId, playerError, isEntering, isEnterSuccess, enterFSM]);

  const player = useMemo(() => existingPlayer ?? enteredPlayer, [
    existingPlayer,
    enteredPlayer,
  ]);

  if (isPlayerFetching || (!player && isEntering)) return null;

  if (!player) return null;

  const mode = width > height ? 'fit-height' : 'fit-width';

  return (
    <FSMProvider fsmId={menuId}>
      <FSMStateProvider isMentor={false} fsmStateId={player.current_state}>
        <BoardFSMState mode={mode} fsmStateId={player.current_state} />
      </FSMStateProvider>
    </FSMProvider>
  );
};

export default BoardMenu;