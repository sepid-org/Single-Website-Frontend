import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';

function usePaper(paperId: number) {
  const fsmContext = useFSMContext();
  const fsmResult = fsmContext?.useGetPaper?.({ paperId }) ?? { paper: null, isSuccess: false };
  const queryResult = useGetPaperQuery({ paperId: paperId.toString() }, { skip: Boolean(fsmContext.useGetPaper) });

  if (fsmContext && fsmResult.isSuccess) {
    return { paper: fsmResult.paper, isSuccess: fsmResult.isSuccess };
  } else {
    return { paper: queryResult.data, isSuccess: queryResult.isSuccess };
  }
}

export default usePaper;