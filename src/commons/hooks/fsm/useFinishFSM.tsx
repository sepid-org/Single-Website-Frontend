import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useCallback } from "react";
import { useFSMContext } from "../useFSMContext";

const useFinishFSM = () => {
  const { player } = useFSMContext();
  const [_finishFSM, finishFSMResult] = useFinishFSMMutation();

  const finishFSM = useCallback(() => {
    if (!player?.id) return;
    _finishFSM({ playerId: player.id });
  }, [player?.id, _finishFSM]);

  return [finishFSM, finishFSMResult] as const;
};

export default useFinishFSM;
