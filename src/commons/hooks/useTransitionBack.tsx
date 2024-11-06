import {
  useGoBackwardMutation,
  useMentorMoveBackwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from './useFSMStateContext';

interface TransitionBackParams {
  playerId: string;
}

type MutationResult<T> = {
  data?: T;
  error?: unknown;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
};

const useTransitionBack = ({ playerId }: TransitionBackParams): [
  () => Promise<void>,
  MutationResult<unknown>
] => {
  const { isMentor } = useFSMStateContext();
  const [goBackward, goBackwardResult] = useGoBackwardMutation();
  const [mentorMoveBackward, mentorMoveBackwardResult] = useMentorMoveBackwardMutation();

  const transitBack = async () => {
    try {
      // if (isMentor) {
      //   await mentorMoveBackward({
      //     playerId,
      //   }).unwrap();
      // } 
      await goBackward({
        playerId,
      }).unwrap();
    } catch (error) {

    }
  };

  // Use the appropriate result based on whether it's mentor or student
  const currentResult = isMentor ? mentorMoveBackwardResult : goBackwardResult;

  return [
    transitBack,
    {
      data: currentResult.data,
      error: currentResult.error,
      isLoading: currentResult.isLoading,
      isSuccess: currentResult.isSuccess,
      isError: currentResult.isError,
      isUninitialized: currentResult.isUninitialized,
    }
  ];
};

export default useTransitionBack;