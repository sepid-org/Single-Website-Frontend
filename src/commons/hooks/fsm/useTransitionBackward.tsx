import {
  useGoBackwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { PlayerType } from 'commons/types/models';
import { useGetFSMStateInwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';

interface TransitionBackwardParams {
  player: PlayerType;
}

const useTransitionBackward = ({ player }: TransitionBackwardParams) => {
  const { data: inwardEdges } = useGetFSMStateInwardEdgesQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player) });
  const [goBackward, goBackwardResult] = useGoBackwardMutation();

  const transitBackward = async () => {
    try {
      await goBackward({
        playerId: player.id,
      }).unwrap();
    } catch (error) {

    }
  };

  return {
    transitBackward,
    result: goBackwardResult,
    canTransitBack: Boolean(inwardEdges?.length !== 0),
  };
};

export default useTransitionBackward;