import { useNavigate } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useEffect } from "react";
import { useFSMContext } from "../useFSMContext";

const useFinishFSM = ({ fsmId, navigateAfter = true }) => {
  const navigate = useNavigate();
  const { player } = useFSMContext();
  const [finishFSM, finishFSMResult] = useFinishFSMMutation()
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const programSlug = fsm?.program_slug;
  // todo: convert to rtk mode
  const result = null;

  useEffect(() => {
    if (navigateAfter && finishFSMResult.isSuccess && programSlug) {
      navigate(`/program/${programSlug}/`);
    }
  }, [finishFSMResult, fsm?.program_slug])

  const handleFinishFSM = () => {
    finishFSM({ playerId: player.id })
  };

  return [handleFinishFSM, result];
}

export default useFinishFSM;