import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';

function usePaper(paperId: number | null | undefined) {
  const fsmContext = useFSMContext();
  const useCache = !!fsmContext?.useCachedPaper;

  // Get result from FSM cache if available
  const fsmResult = useCache ? fsmContext.useCachedPaper({ paperId }) : null;

  // Get result from Redux query if needed
  const queryResult = useGetPaperQuery(
    { paperId: paperId?.toString() },
    { skip: useCache || !paperId }
  );

  if (!paperId) {
    return { paper: null, isSuccess: true, error: null };
  }

  if (useCache && fsmResult?.isSuccess) {
    return {
      paper: fsmResult.paper,
      isSuccess: true,
      error: null,
    };
  }

  return {
    paper: queryResult.data ?? null,
    isSuccess: queryResult.isSuccess,
    error: queryResult.error ?? null,
  };
}

export default usePaper;