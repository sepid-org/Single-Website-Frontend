import { useNavigate } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useEffect, useCallback } from "react";
import { useFSMContext } from "../useFSMContext";

interface UseFinishFSMParams {
  fsmId: number;
  navigateAfter?: boolean;
}

const useFinishFSM = ({ fsmId, navigateAfter = true }: UseFinishFSMParams) => {
  const navigate = useNavigate();
  const { player } = useFSMContext();
  const [finishFSM, finishFSMResult] = useFinishFSMMutation();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const programSlug = fsm?.program_slug;

  // Redirection effect
  useEffect(() => {
    if (navigateAfter && finishFSMResult.isSuccess && programSlug) {
      navigate(`/program/${programSlug}/`);
    }
  }, [
    navigateAfter,
    finishFSMResult.isSuccess,
    programSlug,
    navigate,
  ]);

  // Mutation trigger
  const handleFinishFSM = useCallback(() => {
    if (!player?.id) {
      console.error("Player ID is required to finish FSM");
      return;
    }

    finishFSM({ playerId: player.id }).catch((err) => {
      console.error("Failed to finish FSM:", err);
    });
  }, [player?.id, finishFSM]);

  return [handleFinishFSM, finishFSMResult] as const;
};

export default useFinishFSM;
