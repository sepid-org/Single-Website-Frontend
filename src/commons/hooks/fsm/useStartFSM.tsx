import { useNavigate } from "react-router-dom";
import { useEnterFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { PlayerType } from "commons/types/models";
import { MutationResult } from "commons/types/rtk";

interface StartFSMParams {
  fsmId: number;
  redirectPath?: string;
  password?: string;
}

const useStartFSM = (): [
  (params: StartFSMParams) => Promise<PlayerType>,
  MutationResult<PlayerType>
] => {
  const navigate = useNavigate();
  const [_enterFSM, enterFSMResult] = useEnterFSMMutation();

  const startFSM = async ({ fsmId, redirectPath }: StartFSMParams) => {
    const result = await _enterFSM({ fsmId }).unwrap();
    if (redirectPath) {
      navigate(redirectPath || `/fsm/${fsmId}/`);
    }
    return result;
  };

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