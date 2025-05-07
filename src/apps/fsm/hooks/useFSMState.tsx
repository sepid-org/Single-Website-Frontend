import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMStateQuery } from '../redux/slices/fsm/FSMStateSlice';

function useFSMState(fsmStateId: number) {
  const fsmContext = useFSMContext();
  const fsmResult = fsmContext?.useCachedFSMState?.({ fsmStateId }) ?? { fsmState: null, isSuccess: false };
  const queryResult = useGetFSMStateQuery(
    { fsmStateId: fsmStateId?.toString() },
    { skip: Boolean(fsmContext.useCachedFSMState) || !fsmStateId }
  );

  if (fsmContext && fsmResult.isSuccess) {
    return { fsmState: fsmResult.fsmState, isSuccess: fsmResult.isSuccess, error: fsmResult.error };
  } else {
    return { fsmState: queryResult.data, isSuccess: queryResult.isSuccess, error: queryResult.error };
  }
}

export default useFSMState;