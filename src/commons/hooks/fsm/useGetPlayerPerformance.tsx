import { useGetPlayerPerformanceQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useMemo } from 'react';

interface Params { playerId: number }

interface Counts {
  correct: number;
  wrong: number;
  unknown: number;
}

const usePlayerPerformance = ({ playerId }: Params) => {
  const { data: performance, isLoading } =
    useGetPlayerPerformanceQuery({ playerId }, { skip: !playerId });

  const { correct, wrong, unknown } = useMemo<Counts>(() => {
    if (!performance) return { correct: 0, wrong: 0, unknown: 0 };

    return Object.values(performance).reduce<Counts>(
      (acc, ans: any) => {
        if (ans.score === 100) acc.correct += 1;
        else if (ans.score === 0) acc.wrong += 1;
        else acc.unknown += 1;
        return acc;
      },
      { correct: 0, wrong: 0, unknown: 0 }
    );
  }, [performance]);

  return { isLoading, correct, wrong, unknown };
};

export default usePlayerPerformance;