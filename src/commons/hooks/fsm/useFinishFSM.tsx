import { useNavigate } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useFSMStateContext } from "../useFSMStateContext";
import { useEffect } from "react";

const useFinishFSM = ({ fsmId, navigateAfter = true }) => {
  const navigate = useNavigate();
  const { playerId } = useFSMStateContext();
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
    finishFSM({ playerId })
  };

  return [handleFinishFSM, result];
}

export default useFinishFSM;