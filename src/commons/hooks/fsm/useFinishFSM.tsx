import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useCallback, useEffect, useState } from "react";
import { useFSMContext } from "../useFSMContext";
import { useNavigate } from "react-router-dom";

const useFinishFSM = () => {
  const navigate = useNavigate();
  const { player, fsmId } = useFSMContext();
  const [showCompletionPage, setShowCompletionPage] = useState(true);
  const [_finishFSM, finishFSMResult] = useFinishFSMMutation();

  useEffect(() => {
    if (finishFSMResult.isSuccess && showCompletionPage) {
      navigate(`/fsm/${fsmId}/player/${player.id}/completion`);
    }
  }, [finishFSMResult.isSuccess])

  const finishFSM = useCallback((showCompletionPage = true) => {
    if (!player?.id) return;
    setShowCompletionPage(showCompletionPage);
    _finishFSM({ playerId: player.id });
  }, [player?.id, _finishFSM]);

  return [finishFSM, finishFSMResult] as const;
};

export default useFinishFSM;
