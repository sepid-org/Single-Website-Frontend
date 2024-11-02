import { useFSMStateContext } from './useFSMStateContext';
import { useSubmitButtonMutation } from 'commons/redux/apis/cms/response/ButtonWidget';

interface SubmitButtonParams {
  stateId?: string;
  clickedButtonId?: string;
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

const useSubmitButton = (): [
  (params: SubmitButtonParams) => Promise<void>,
  MutationResult<unknown>
] => {
  const { playerId } = useFSMStateContext();
  const [_submitButton, submitButtonResult] = useSubmitButtonMutation();

  const submitButton = async ({ stateId = null, clickedButtonId = null }: SubmitButtonParams) => {
    _submitButton({
      stateId,
      clickedButtonId,
      playerId,
    }).unwrap();
  };

  return [
    submitButton,
    {
      data: submitButtonResult.data,
      error: submitButtonResult.error,
      isLoading: submitButtonResult.isLoading,
      isSuccess: submitButtonResult.isSuccess,
      isError: submitButtonResult.isError,
      isUninitialized: submitButtonResult.isUninitialized,
    }
  ];
};

export default useSubmitButton;