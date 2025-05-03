import { useEffect, useState } from "react";
import { useFSMContext } from "commons/hooks/useFSMContext";
import { useGetFSMAllStatesQuery } from "../redux/slices/fsm/FSMSlice";
import { useGetFSMStateQuery } from "../redux/slices/fsm/FSMStateSlice";

type PropsType = {
  fsmStateId: string;
};

// module‑level cache shared across all hook instances
const stateCache = new Map<string, any>();

const useGetFSMState = ({ fsmStateId }: PropsType) => {
  const { fsmId } = useFSMContext();
  const [useFullStates, setUseFullStates] = useState(false);

  // after 3s switch from single‐item to full‐list
  useEffect(() => {
    const timer = setTimeout(() => setUseFullStates(true), 3_000);
    return () => clearTimeout(timer);
  }, []);

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

  // update cache when single‐item comes back
  useEffect(() => {
    if (singleState) {
      stateCache.set(singleState.id, singleState);
    }
  }, [singleState]);

  // update cache when full‐list comes back
  useEffect(() => {
    if (fullStatesData?.states) {
      for (const s of fullStatesData.states) {
        stateCache.set(s.id, s);
      }
    }
  }, [fullStatesData]);

  // final value is always “cache first,” then whichever query is active
  const cached = stateCache.has(fsmStateId);
  const fsmState = stateCache.get(fsmStateId)
    ?? (useFullStates
      ? fullStatesData?.states.find((s) => s.id === fsmStateId)
      : singleState
    );

  // mirror loading/success/error from the “live” query unless we’re already cached
  const isLoading = cached
    ? false
    : useFullStates
      ? isFullLoading
      : isSingleLoading;

  const isSuccess = cached
    ? true
    : useFullStates
      ? isFullSuccess
      : isSingleSuccess;

  const error = cached
    ? undefined
    : useFullStates
      ? fullError
      : singleError;

  console.log(fsmStateId, stateCache.get(fsmStateId), fsmState)

  return { fsmState, isLoading, isSuccess, error };
};

export default useGetFSMState;