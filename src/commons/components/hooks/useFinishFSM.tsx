import { useNavigate, useParams } from "react-router-dom";
import { useGetFSMQuery } from "apps/website-display/redux/features/fsm/FSMSlice";

const useFinishFSM = () => {
  const navigate = useNavigate();
  const { fsmId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const programSlug = fsm?.program_slug;

  const finishFSM = () => {
    if (programSlug) {
      navigate(`/program/${programSlug}/`);
    }
  };
  return { finishFSM };
}

export default useFinishFSM;