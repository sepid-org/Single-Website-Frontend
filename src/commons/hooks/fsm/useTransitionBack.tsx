import {
  useGoBackwardMutation,
  useMentorMoveBackwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from '../useFSMStateContext';
import { PlayerType } from 'commons/types/models';

interface TransitionBackParams {
  player: PlayerType;
}

type MutationResult<T> = {
  data?: T;
  error?: unknown;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
};

const useTransitionBack = ({ player }: TransitionBackParams): [
  () => Promise<void>,
  MutationResult<unknown>
] => {
  const { isMentor } = useFSMStateContext();
  const [goBackward, goBackwardResult] = useGoBackwardMutation();

  const transitBack = async () => {
    try {
      await goBackward({
        playerId: player.id,
      }).unwrap();
    } catch (error) {

    }
  };

  return [
    transitBack,
    {
      data: goBackwardResult.data,
      error: goBackwardResult.error,
      isLoading: goBackwardResult.isLoading,
      isSuccess: goBackwardResult.isSuccess,
      isError: goBackwardResult.isError,
      isUninitialized: goBackwardResult.isUninitialized,
    }
  ];
};

export default useTransitionBack;