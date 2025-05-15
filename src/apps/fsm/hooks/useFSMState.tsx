import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMStateQuery } from '../redux/slices/fsm/FSMStateSlice';

function useFSMState(fsmStateId: number | null | undefined) {
  const fsmContext = useFSMContext();
  const getCachedFSMState = fsmContext?.getCachedFSMState;

  // Try to get FSM state from cache if available
  const cachedFSMState = getCachedFSMState ? getCachedFSMState({ fsmStateId }) : null;

  // Fallback to Redux query if cache is not used
  const queryResult = useGetFSMStateQuery(
    { fsmStateId: fsmStateId?.toString() },
    { skip: cachedFSMState?.isSuccess || !fsmStateId }
  );

  if (!fsmStateId) {
    return { fsmState: null, isLoading: false, isSuccess: false, error: null };
  }

  if (cachedFSMState?.isSuccess) {
    return {
      fsmState: cachedFSMState.fsmState,
      isLoading: false,
      isSuccess: true,
      error: null,
    };
  }

  return {
    fsmState: queryResult.data ?? null,
    isLoading: queryResult.isLoading,
    isSuccess: queryResult.isSuccess,
    error: queryResult.error ?? null,
  };
}

export default useFSMState;