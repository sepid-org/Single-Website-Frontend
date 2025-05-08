import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';

function usePaper(paperId: number | null | undefined) {
  const fsmContext = useFSMContext();
  const getCachedPaper = fsmContext?.getCachedPaper;

  // Get result from FSM cache if available
  const cachedPaper = getCachedPaper ? getCachedPaper({ paperId }) : null;

  // Get result from Redux query if needed
  const queryResult = useGetPaperQuery(
    { paperId: paperId?.toString() },
    { skip: cachedPaper?.isSuccess || !paperId }
  );

  if (!paperId) {
    return { paper: null, isSuccess: false, error: null };
  }

  if (cachedPaper?.isSuccess) {
    return {
      paper: cachedPaper.paper,
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