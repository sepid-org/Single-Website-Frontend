import React, { FC, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  useEnterFSMMutation,
  useGetCurrentUserPlayerQuery,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';

import FSMStartPage from './FSMStartPage';
import FSMBody from './Body';
import FSMCompletionPage from './FSMCompletionPage';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import { DynamicObjectsType } from 'commons/types/object/object';

export type FSMProps = {
  fsmId?: number;
  dynamicObjects?: DynamicObjectsType;
};

const useQueryParam = (key: string): string | null => {
  return new URLSearchParams(useLocation().search).get(key);
};

const FSM: FC<FSMProps> = ({
  fsmId: fsmIdProp,
  dynamicObjects,
}) => {
  const { fsmId: fsmIdParam } = useParams<{ fsmId?: string }>();
  const fsmId = useMemo(() => Number(fsmIdParam) || fsmIdProp, [fsmIdParam, fsmIdProp]);

  const forceEnter = useQueryParam('forceEnter') === 'true';

  const {
    data: fsm,
    isLoading: isFsmLoading,
  } = useGetFSMQuery({ fsmId: fsmId! }, { skip: !fsmId });

  const {
    data: existingPlayer,
    isLoading: isPlayerLoading,
    error: playerError,
  } = useGetCurrentUserPlayerQuery({ fsmId: fsmId! }, { skip: !fsmId });

  const [
    enterFSM,
    {
      data: enteredPlayer,
      isLoading: isEntering,
      isSuccess: isEnterSuccess,
      isError: isEnterError,
    },
  ] = useEnterFSMMutation();

  useEffect(() => {
    if (!fsmId) return;

    const notFound =
      playerError && 'status' in playerError && playerError.status === 404;

    const shouldEnter = (forceEnter || notFound) && !isEntering && !isEnterSuccess && !isEnterError;

    if (shouldEnter) enterFSM({ fsmId });
  }, [fsmId, forceEnter, playerError, isEntering, isEnterSuccess, enterFSM]);

  const player = existingPlayer ?? enteredPlayer;
  const isLoading = isFsmLoading || (isPlayerLoading && !player) || isEntering;

  if (isLoading) return null;
  if (!fsm || !player) return null;

  const renderContent = () => {
    if (!player.started_at && fsm.scene.mode === 'normal') return <FSMStartPage />;
    if (!player.finished_at || (player.finished_at && fsm.scene.mode === 'board')) {
      return <FSMBody />;
    }
    if (player.finished_at && fsm.scene.mode === 'normal') return <FSMCompletionPage />;
    return null;
  };

  const content = renderContent();
  if (!content) return null;

  return (
    <FSMProvider
      fsmId={fsmId}
      dynamicObjects={dynamicObjects}
    >
      {content}
    </FSMProvider>
  );
};

export default FSM;
