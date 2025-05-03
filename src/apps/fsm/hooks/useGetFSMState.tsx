import { useEffect, useSyncExternalStore } from "react";
import { useFSMContext } from "commons/hooks/useFSMContext";
import { useGetFSMAllStatesQuery } from "../redux/slices/fsm/FSMSlice";
import { useGetFSMStateQuery } from "../redux/slices/fsm/FSMStateSlice";

type PropsType = {
  fsmStateId: string;
};

// shared flag and subscribers
let sharedUseFullStates = false;
const subscribers = new Set<() => void>();

const notifySubscribers = () => {
  Array.from(subscribers).forEach(cb => cb());
};

// switch flag after 3s
setTimeout(() => {
  sharedUseFullStates = true;
  notifySubscribers();
}, 3000);

// subscribe to shared flag
function useSharedUseFullStates() {
  return useSyncExternalStore(
    (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    () => sharedUseFullStates
  );
}

// module-level cache
const stateCache = new Map<string, any>();

const useGetFSMState = ({ fsmStateId }: PropsType) => {
  const { fsmId } = useFSMContext();
  const useFullStates = useSharedUseFullStates();
  // always fire the single‐item query until `useFullStates` flips true
  const {
    data: singleState,
    isLoading: isSingleLoading,
    isSuccess: isSingleSuccess,
    error: singleError,
  } = useGetFSMStateQuery(
    { fsmStateId },
    { skip: useFullStates }
  );

  // always fire the full‐list query once `useFullStates` is true
  const {
    data: fullStatesData,
    isLoading: isFullLoading,
    isSuccess: isFullSuccess,
    error: fullError,
  } = useGetFSMAllStatesQuery(
    { fsmId },
    { skip: !useFullStates }
  );

  // cache from single-state query
  useEffect(() => {
    if (singleState) {
      stateCache.set(singleState.id, singleState);
    }
  }, [singleState]);

  // cache from full list
  useEffect(() => {
    if (fullStatesData?.states) {
      for (const s of fullStatesData.states) {
        stateCache.set(s.id, s);
      }
    }
  }, [fullStatesData]);

  // final value is always “cache first,” then whichever query is active
  const isCached = stateCache.has(fsmStateId);
  const fsmState = stateCache.get(fsmStateId)
    ?? (useFullStates
      ? fullStatesData?.states.find((s) => s.id === fsmStateId)
      : singleState
    );

  const isLoading = isCached
    ? false
    : useFullStates
      ? isFullLoading
      : isSingleLoading;

  const isSuccess = isCached
    ? true
    : useFullStates
      ? isFullSuccess
      : isSingleSuccess;

  const error = isCached
    ? undefined
    : useFullStates
      ? fullError
      : singleError;

  return { fsmState, isLoading, isSuccess, error };
};

export default useGetFSMState;