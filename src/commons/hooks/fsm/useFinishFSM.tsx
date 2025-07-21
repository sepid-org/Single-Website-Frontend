import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useCallback, useEffect, useState } from "react";
import { useFSMContext } from "../useFSMContext";
import { useNavigate } from "react-router-dom";

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
