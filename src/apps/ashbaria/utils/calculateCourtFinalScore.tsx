import { BalancesType } from "commons/types/bank";
import calculateCourtFinalSupportPercentage from "./calculateCourtFinalSupportPercentage";
import { CourtType } from "../types";

type inputType = {
  fsmId: string;
  balances: BalancesType;
  court: CourtType;
}

const calculateCourtFinalScore = ({ fsmId, balances, court }: inputType) => {
  const courtFinalSupportPercentage = calculateCourtFinalSupportPercentage({ fsmId, balances });
  const courtTotalScore = Math.round(court.reward_score * courtFinalSupportPercentage / 100)
  return courtTotalScore
}

export default calculateCourtFinalScore;