import useSubmitButton from '../useSubmitButton';

interface ChangeStateParams {
  destinationStateId: string;
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
  const [submitButton, submitButtonResult] = useSubmitButton();

  const changeState = async ({ destinationStateId, clickedButtonId = null }: ChangeStateParams) => {
    submitButton({
      destinationStateId,
      clickedButtonId,
    });
  };

  return [
    changeState,
    submitButtonResult,
  ];
};

export default useChangeState;