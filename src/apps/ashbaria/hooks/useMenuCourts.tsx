import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import { useGetCourtsQuery } from "../redux/slices/GameLogics";
import { useGetFSMsQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import { CourtType } from "../types";

type useMenuCourtsType = {
  courts: CourtType[]
}

const useMenuCourts = (): useMenuCourtsType => {
  const { programSlug, fsmId } = useParams();
  const { data: programUserFSMsStatus = [] } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber: 1 })
  const { data: balances = {} } = useGetMyBalancesQuery();
  const { data: courts = [] } = useGetCourtsQuery();

  return ({
    courts: courts?.map(court => ({
      ...court,
    }))
  })
};

export default useMenuCourts;
