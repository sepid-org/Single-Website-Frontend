import { useNavigate } from "react-router-dom";
import { useEnterFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { PlayerType } from "commons/types/models";
import { MutationResult } from "commons/types/rtk";
import { useEffect } from "react";

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

  const startFSM = async ({ password }: StartFSMParams) => {
    return await _enterFSM({ fsmId }).unwrap();
  };

  useEffect(() => {
    if (enterFSMResult.isSuccess) {
      navigate(redirectPath || `/fsm/${fsmId}/`);
    }
  }, [enterFSMResult])

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