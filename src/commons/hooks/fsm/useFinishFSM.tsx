import { useNavigate, useParams } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useFinishFSMMutation } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import { useFSMStateContext } from "../useFSMStateContext";
import { useEffect } from "react";

const useFinishFSM = ({ fsmId }) => {
  const navigate = useNavigate();
  const { playerId } = useFSMStateContext();
  const [finishFSM, finishFSMResult] = useFinishFSMMutation()
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const programSlug = fsm?.program_slug;
  const result = null;

  useEffect(() => {
    if (finishFSMResult.isSuccess && programSlug) {
      navigate(`/program/${programSlug}/`);
    }
  }, [finishFSMResult])

  const handleFinishFSM = () => {
    finishFSM({ playerId })
  };

  return [handleFinishFSM, result];
}

export default useFinishFSM;