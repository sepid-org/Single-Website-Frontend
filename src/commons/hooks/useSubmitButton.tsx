import { useFSMStateContext } from './useFSMStateContext';
import { useSubmitButtonMutation } from 'commons/redux/apis/cms/response/ButtonWidget';

interface SubmitButtonParams {
  stateId?: string | null;
  clickedButtonId?: string | null;
}

interface SubmitButtonPayload {
  stateId: string | null;
  clickedButtonId: string | null;
  playerId: string;
}

// Define a more specific error type
interface ApiError {
  data: unknown;
  status: number;
}

// Define a type for the mutation result that matches RTK Query's pattern
type MutationResult<T> = {
  data?: T;
  error?: ApiError;
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
    try {
      const payload: SubmitButtonPayload = {
        stateId,
        clickedButtonId,
        playerId,
      };

      await _submitButton(payload).unwrap();
    } catch (error) {
      // Re-throw the error to be handled by the component using this hook
      throw error;
    }
  };

  return [
    submitButton,
    {
      data: submitButtonResult.data,
      error: submitButtonResult.error as ApiError | undefined,
      isLoading: submitButtonResult.isLoading,
      isSuccess: submitButtonResult.isSuccess,
      isError: submitButtonResult.isError,
      isUninitialized: submitButtonResult.isUninitialized,
    }
  ];
};

export default useSubmitButton;