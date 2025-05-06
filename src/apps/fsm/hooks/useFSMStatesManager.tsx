import { useEffect, useState } from "react";
import { useGetFSMAllStatesQuery } from "../redux/slices/fsm/FSMSlice";
import { useGetFSMStateQuery } from "../redux/slices/fsm/FSMStateSlice";
import { FSMStateType } from "commons/types/models";

export type FSMStateResult = {
  fsmState: FSMStateType;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
};

/**
 * Custom hook that manages a cache-first FSM state fetch strategy,
 * seamlessly switching from single-item to full-list queries.
 */
const useFSMStatesManager = ({ fsmId }: { fsmId: number }) => {

  // Flag to switch from single-item to full-list fetch
  const [useFullStates, setUseFullStates] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUseFullStates(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cache for FSM states
  const [stateCache] = useState<Map<number, FSMStateType>>(() => new Map());

  // Update cache from full-list query
  const fullQuery = useGetFSMAllStatesQuery(
    { fsmId },
    { skip: !useFullStates }
  );

  const updateCache = (fsmStateId: number, fsmState: FSMStateType) => {
    if (!stateCache.has(fsmStateId)) {
      stateCache.set(fsmStateId, fsmState);
    }
  }

  useEffect(() => {
    fullQuery.data?.states.forEach((s) => {
      updateCache(parseInt(s.id), s);
    });
  }, [fullQuery.data]);

  /**
   * Retrieves FSM state by ID, with cache-first;
   * automatically uses single or full queries based on switch.
   */
  function useGetFSMState({ fsmStateId }: { fsmStateId: number }): FSMStateResult {
    const isCached = stateCache.has(fsmStateId);

    // Single-item query
    const singleQuery = useGetFSMStateQuery(
      { fsmStateId: fsmStateId?.toString() },
      { skip: isCached || !fsmStateId }
    );

    useEffect(() => {
      if (singleQuery.data) {
        updateCache(parseInt(singleQuery.data.id), singleQuery.data);
      }
    }, [singleQuery.data]);

    const { data: singleState, isLoading: isSingleLoading, isSuccess: isSingleSuccess, error: singleError } = singleQuery;
    const { data: fullStatesData, isLoading: isFullLoading, isSuccess: isFullSuccess, error: fullError } = fullQuery;

    const fsmState = isCached
      ? stateCache.get(fsmStateId)
      : useFullStates
        ? fullStatesData?.states.find((s) => parseInt(s.id) === fsmStateId)
        : singleState;

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
  }

  return { useGetFSMState };
}

export default useFSMStatesManager;