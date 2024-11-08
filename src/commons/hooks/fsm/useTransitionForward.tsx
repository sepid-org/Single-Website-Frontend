import React from 'react';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import useChangeState from './useChangeState';
import { PlayerType } from 'commons/types/models';
import dialogService from 'commons/components/organisms/PortalDialog';
import ChangeStateContent from 'commons/components/molecules/ChangeStateContent';
import { toast } from 'react-toastify';
import { useFSMContext } from '../useFSMContext';

// Define a type for the mutation result that matches RTK Query's pattern
type MutationResult<T> = {
  data?: T;
  error?: unknown;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
};

const useTransitionForward = ({ player }: { player: PlayerType }): [
  () => Promise<void>,
  MutationResult<unknown>
] => {
  const { fsmId, openDialog, closeDialog } = useFSMContext();
  const [changeState, setChangeState] = useChangeState();
  const { data: outwardEdges } = useGetFSMStateOutwardEdgesQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })

  const transitForward = async () => {
    if (outwardEdges.length === 0) {
      toast.error('یالی برای جلو رفتن وجود ندارد');
      return;
    } else if (outwardEdges.length === 1) {
      changeState({ destinationStateId: outwardEdges[0].head });
    } else {
      openDialog(
        <ChangeStateContent
          player={player}
          fsmId={fsmId}
          onSuccess={() => closeDialog()}
        />
      )
    }
  };

  return [
    transitForward,
    setChangeState,
  ];
};

export default useTransitionForward;