import { useNavigate, useParams } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";

const useFinishFSM = () => {
  const navigate = useNavigate();
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const programSlug = fsm?.program_slug;
  const result = null;

  const finishFSM = () => {
    if (programSlug) {
      navigate(`/program/${programSlug}/`);
    }
  };
  return { finishFSM, result };
}

export default useFinishFSM;