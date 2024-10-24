import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import { useGetCourtsQuery } from "../redux/slices/GameLogics";
import { useGetFSMsQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { FSMType } from "commons/types/models";
import { useGetMyBalancesQuery } from "commons/redux/slices/bank/MyInfo";
import calculateCourtFinalScore from "../utils/calculateCourtFinalScore";

type MenuCourtsType = {
  courts: FSMType[]
}

const useGetMenuCourts = (): MenuCourtsType => {
  const { programSlug, fsmId } = useParams();
  const { data: programUserFSMsStatus = [] } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber: 1 })
  const { data: balances = {} } = useGetMyBalancesQuery();
  const { data: courts } = useGetCourtsQuery();

  console.log(courts.map(court => calculateCourtFinalScore({ fsmId, balances, court })))

  return ({
    courts: fsmsData?.fsms.map(fsm => ({
      ...fsm,
    }))
  })
};

export default useGetMenuCourts;
