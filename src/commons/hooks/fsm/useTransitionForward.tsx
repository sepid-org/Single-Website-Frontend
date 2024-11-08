import React from 'react';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import useChangeState from './useChangeState';
import { PlayerType } from 'commons/types/models';
import ChangeStateContent from 'commons/components/molecules/ChangeStateContent';
import { toast } from 'react-toastify';
import { useFSMContext } from '../useFSMContext';


const useTransitionForward = ({ player }: { player: PlayerType }) => {
  const { fsmId, openDialog, closeDialog } = useFSMContext();
  const [changeState, changeStateResult] = useChangeState();
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

  return {
    transitForward,
    result: changeStateResult,
    canTransitForward: Boolean(outwardEdges?.length !== 0),
  };
};

export default useTransitionForward;