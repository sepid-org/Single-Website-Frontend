import {
  useMentorMoveForwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useFSMStateContext } from './useFSMStateContext';
import useSubmitButton from './useSubmitButton';

interface ChangeStateParams {
  stateId: string;
  clickedButtonId?: string | null;
}

// Define a type for the mutation result that matches RTK Query's pattern
type MutationResult<T> = {
  data?: T;
  error?: unknown;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUninitialized: boolean;
};

const useChangeState = (): [
  (params: ChangeStateParams) => Promise<void>,
  MutationResult<unknown>
] => {
  const { isMentor } = useFSMStateContext();
  const [submitButton, submitButtonResult] = useSubmitButton();
  const [mentorMoveForward, mentorMoveForwardResult] = useMentorMoveForwardMutation();

  const changeState = async ({ stateId, clickedButtonId = null }: ChangeStateParams) => {
    // if (isMentor) {
    //   todo: Implement mentor move forward
    //   await mentorMoveForward({
    //     edgeId: edge.id,
    //   });
    //   return;
    // } 
    submitButton({
      stateId,
      clickedButtonId,
    });
  };

  // Return the result that matches the current mode (mentor or student)
  const currentResult = isMentor ? mentorMoveForwardResult : submitButtonResult;

  return [
    changeState,
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

export default useChangeState;