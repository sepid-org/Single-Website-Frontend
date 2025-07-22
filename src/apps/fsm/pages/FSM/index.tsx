import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useEnterFSMMutation,
  useGetCurrentUserPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';

import FSMStartPage from './FSMStartPage';
import FSMBody from './Body';
import FSMCompletionPage from './FSMCompletionPage';

type PropsType = {};

const FSM: FC<PropsType> = () => {
  const { fsmId: fsmIdParam } = useParams<{ fsmId: string }>();
  const fsmId = Number(fsmIdParam);

  const { data: fsm, isLoading: isFsmLoading, error: fsmError } = useGetFSMQuery(
    { fsmId },
    { skip: !fsmId }
  );

  const {
    data: existingPlayer,
    isLoading: isPlayerLoading,
    error: playerError,
  } = useGetCurrentUserPlayerQuery({ fsmId }, { skip: !fsmId });

  const [
    enterFSM,
    {
      data: enteredPlayer,
      isLoading: isEntering,
      isSuccess: isEnterSuccess,
      error: enterError,
    },
  ] = useEnterFSMMutation();

  useEffect(() => {
    if (!fsmId) return;

    const notFound =
      playerError && 'status' in playerError && playerError.status === 404;

    if (notFound && !isEntering && !isEnterSuccess) {
      enterFSM({ fsmId });
    }
  }, [fsmId, playerError, isEntering, isEnterSuccess, enterFSM]);

  const player = useMemo(
    () => existingPlayer ?? enteredPlayer,
    [
      existingPlayer,
      enteredPlayer,
    ]
  );

  if (isFsmLoading || (isPlayerLoading && !player) || isEntering) return null;

  if (!fsm || !player) return null;

  if (!player.started_at && fsm.scene.mode === 'normal') {
    return <FSMStartPage />;
  }

  if (!player.finished_at || (player.finished_at && fsm.scene.mode === 'board')) {
    return <FSMBody />;
  }

  if (player.finished_at && fsm.scene.mode === 'normal') {
    return <FSMCompletionPage playerId={parseInt(player.id)} />;
  }

  return null;
};

export default FSM;