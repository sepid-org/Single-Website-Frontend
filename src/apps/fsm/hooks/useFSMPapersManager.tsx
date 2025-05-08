import { useEffect, useState } from 'react';
import { useGetFSMAllPapersQuery } from '../redux/slices/fsm/FSMSlice';
import { PaperType } from 'commons/types/models';

export type PaperResult = {
  paper: PaperType;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
};

/**
 * Manager hook that controls when to switch from single-paper fetch
 * to full-papers fetch, with cache-first retrieval.
 */
const useFSMPapersManager = ({ fsmId }: { fsmId: number }) => {

  // control flag: after 3s, load full list
  const [useFullPapers, setUseFullPapers] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setUseFullPapers(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // shared cache for all papers
  const [paperCache] = useState<Map<number, PaperType>>(() => new Map());

  // preload full list when flag flips
  const fullQuery = useGetFSMAllPapersQuery(
    { fsmId },
    { skip: !useFullPapers }
  );

  const updateCache = (paperId: number, paper: PaperType) => {
    if (!paperCache.has(paperId)) {
      paperCache.set(paperId, paper);
    }
  }

  useEffect(() => {
    fullQuery.data?.papers.forEach(p => {
      updateCache(parseInt(p.id), p);
    });
  }, [fullQuery.data]);

  const getCachedPaper = ({ paperId }: { paperId: number }): PaperResult => {
    const isCached = paperCache.has(paperId);
    const paper = isCached ? paperCache.get(paperId) : null;
    const isSuccess = isCached ? true : false;
    return { paper, isLoading: false, isSuccess, error: undefined };
  }

  return { getCachedPaper };
}

export default useFSMPapersManager;