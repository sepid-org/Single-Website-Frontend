import { useEffect, useState } from "react";
import { useGetFSMAllStatesQuery } from "../redux/slices/fsm/FSMSlice";
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

  const getCachedFSMState = ({ fsmStateId }: { fsmStateId: number }): FSMStateResult => {
    const isCached = stateCache.has(fsmStateId);
    const fsmState = isCached ? stateCache.get(fsmStateId) : null;
    const isSuccess = isCached ? true : false;
    return { fsmState, isLoading: false, isSuccess, error: undefined };
  }

  return { getCachedFSMState };
}

export default useFSMStatesManager;