import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMStateQuery } from '../redux/slices/fsm/FSMStateSlice';

function useFSMState(fsmStateId: number | null | undefined) {
  const fsmContext = useFSMContext();
  const useCache = !!fsmContext?.useCachedFSMState;

  // Try to get FSM state from cache if available
  const fsmResult = useCache ? fsmContext.useCachedFSMState({ fsmStateId }) : null;

  // Fallback to Redux query if cache is not used
  const queryResult = useGetFSMStateQuery(
    { fsmStateId: fsmStateId?.toString() },
    { skip: useCache || !fsmStateId }
  );

  if (!fsmStateId) {
    return { fsmState: null, isSuccess: true, error: null };
  }

  if (useCache && fsmResult?.isSuccess) {
    return {
      fsmState: fsmResult.fsmState,
      isSuccess: true,
      error: null,
    };
  }

  return {
    fsmState: queryResult.data ?? null,
    isSuccess: queryResult.isSuccess,
    error: queryResult.error ?? null,
  };
}

export default useFSMState;