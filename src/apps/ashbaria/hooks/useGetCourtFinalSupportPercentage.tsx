import { useGetMyBalancesQuery } from "commons/redux/apis/bank/MyInfo";

const useGetCourtFinalSupportPercentage = (fsmId: number) => {
  const { data: balances, isFetching } = useGetMyBalancesQuery();
  if (isFetching) {
    return undefined;
  }
  const courtFinalSupportPercentagesSum = balances?.[`ashbaria-support-fsm${fsmId}`] || 0;
  const courtFinalSupportPercentagesCount = balances?.[`ashbaria-support-fsm${fsmId}-count`] || 1;
  return Math.round(courtFinalSupportPercentagesSum / courtFinalSupportPercentagesCount);
}

export default useGetCourtFinalSupportPercentage;