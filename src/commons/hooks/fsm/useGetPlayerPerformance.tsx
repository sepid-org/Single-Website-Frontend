import { useGetPlayerPerformanceQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";

interface UsePlayerPerformanceParams {
  playerId: number;
}

const usePlayerPerformance = ({ playerId }: UsePlayerPerformanceParams) => {
  const { data: playerPerformance, isLoading } = useGetPlayerPerformanceQuery({ playerId }, { skip: !Boolean(playerId) });

  // Calculate the number of correct answers
  const correctAnswersCount = playerPerformance
    ? Object.values(playerPerformance).reduce((count, answer) => count + (answer.score === 100 ? 1 : 0), 0)
    : 0;

  return {
    isLoading,
    playerPerformance,
    correctAnswersCount,
  };
};

export default usePlayerPerformance;
