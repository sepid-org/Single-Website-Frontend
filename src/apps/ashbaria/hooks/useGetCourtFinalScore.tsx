import { CourtType } from "../types";
import useGetCourtFinalSupportPercentage from "./useGetCourtFinalSupportPercentage";

const useGetCourtFinalScore = (court: CourtType) => {
  const courtFinalSupportPercentage = useGetCourtFinalSupportPercentage(court.corresponding_fsm);
  return Math.round(court.reward_score * courtFinalSupportPercentage / 100);
}

export default useGetCourtFinalScore;