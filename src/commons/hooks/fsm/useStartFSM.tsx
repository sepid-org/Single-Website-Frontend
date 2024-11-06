import { useNavigate } from "react-router-dom";
import { useEnterFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { PlayerType } from "commons/types/models";
import { MutationResult } from "commons/types/rtk";
import { useEffect, useCallback } from "react";

interface UseStartFSMParams {
  fsmId: number;
  redirectPath?: string;
}

interface StartFSMParams {
  password?: string;
}

const useStartFSM = ({
  fsmId,
  redirectPath,
}: UseStartFSMParams): [
    ({ password }: StartFSMParams) => Promise<PlayerType>,
    MutationResult<PlayerType>
  ] => {
  const navigate = useNavigate();
  const [_enterFSM, enterFSMResult] = useEnterFSMMutation();

  const startFSM = useCallback(async ({ password }: StartFSMParams) => {
    try {
      // Include password in the mutation payload if provided
      const payload = {
        fsmId,
        ...(password && { password })
      };

      const result = await _enterFSM(payload).unwrap();
      return result;
    } catch (error) {

    }
  }, [fsmId, _enterFSM]);

  useEffect(() => {
    if (enterFSMResult.isSuccess) {
      navigate(redirectPath || `/fsm/${fsmId}/`);
    }
  }, [enterFSMResult.isSuccess]);

  return [
    startFSM,
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

export default useStartFSM;