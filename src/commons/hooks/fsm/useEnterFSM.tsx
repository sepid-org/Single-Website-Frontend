import { useNavigate } from "react-router-dom";
import { useEnterFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { PlayerType } from "commons/types/models";
import { MutationResult } from "commons/types/rtk";
import { useEffect, useCallback } from "react";

interface UseEnterFSMParams {
  fsmId: number;
  redirectPath?: string;
  reloadOnRedirect?: boolean;
}

const useEnterFSM = ({
  fsmId,
  redirectPath,
  reloadOnRedirect,
}: UseEnterFSMParams): [
    () => Promise<PlayerType>,
    MutationResult<PlayerType>
  ] => {
  const navigate = useNavigate();
  const [_enterFSM, enterFSMResult] = useEnterFSMMutation();

  const enterFSM = useCallback(async () => {
    try {
      const result = await _enterFSM({ fsmId }).unwrap();
      return result;
    } catch (error) {

    }
  }, [fsmId, _enterFSM]);

  useEffect(() => {
    if (enterFSMResult.isSuccess) {
      if (reloadOnRedirect) {
        window.location.href = redirectPath || `/fsm/${fsmId}/`;
      } else {
        navigate(redirectPath || `/fsm/${fsmId}/`);
      }
    }
  }, [enterFSMResult.isSuccess]);

  return [
    enterFSM,
    {
      data: enterFSMResult.data,
      error: enterFSMResult.error,
      isLoading: enterFSMResult.isLoading,
      isSuccess: enterFSMResult.isSuccess,
      isError: enterFSMResult.isError,
      isUninitialized: enterFSMResult.isUninitialized,
    }
  ];
};

export default useEnterFSM;