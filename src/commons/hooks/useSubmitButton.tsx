import { useFSMStateContext } from './useFSMStateContext';
import { SubmitButtonApiInputType, useSubmitButtonMutation } from 'commons/redux/apis/cms/response/ButtonWidget';

interface SubmitButtonParams {
  destinationStateId?: string | null;
  clickedButtonId?: string | null;
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
  const { player } = useFSMStateContext();
  const [_submitButton, submitButtonResult] = useSubmitButtonMutation();

  const submitButton = async ({ destinationStateId = null, clickedButtonId = null }: SubmitButtonParams) => {
    if (!player) {
      throw Error('player is necessary for submitting button')
    }

    try {
      const payload: SubmitButtonApiInputType = {
        destinationStateId,
        clickedButtonId,
        playerId: player.id,
      };
      await _submitButton(payload).unwrap();
    } catch (error) {

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