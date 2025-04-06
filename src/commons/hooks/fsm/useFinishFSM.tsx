import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useCallback, useEffect } from "react";
import { useFSMContext } from "../useFSMContext";
import { useNavigate } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";

const useFinishFSM = () => {
  const navigate = useNavigate();
  const { player, fsmId } = useFSMContext();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const [_finishFSM, finishFSMResult] = useFinishFSMMutation();

  useEffect(() => {
    if (finishFSMResult.isSuccess) {
      navigate(`/fsm/${fsmId}/player/${player.id}/completion`);
    }
  }, [finishFSMResult.isSuccess])

  const finishFSM = useCallback(() => {
    if (!player?.id) return;
    _finishFSM({ playerId: player.id });
  }, [player?.id, _finishFSM]);

  return [finishFSM, finishFSMResult] as const;
};

export default useFinishFSM;
