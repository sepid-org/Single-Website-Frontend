import { BalancesType } from "commons/types/bank";

type inputType = {
  fsmId: string;
  balances: BalancesType;
}

const calculateCourtFinalSupportPercentage = ({ fsmId, balances }: inputType) => {
  const supportPercentagesSum = balances[`ashbaria-support-fsm${fsmId}`] || 0
  const supportPercentagesCount = balances[`ashbaria-support-fsm${fsmId}-count`] || 0

  return Math.round(supportPercentagesSum / supportPercentagesCount)
}

export default calculateCourtFinalSupportPercentage;