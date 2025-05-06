import { useEffect, useState } from 'react';
import { useGetFSMAllPapersQuery } from '../redux/slices/fsm/FSMSlice';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
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

  /**
   * Hook to fetch a single paper by ID, falling back to cache or full list.
   */
  function useGetPaper({ paperId }: { paperId: number }): PaperResult {
    const isCached = paperCache.has(paperId);

    // single-paper query until full-list enabled
    const singleQuery = useGetPaperQuery(
      { paperId: paperId?.toString() },
      { skip: isCached || !paperId }
    );

    useEffect(() => {
      if (singleQuery.data) {
        updateCache(parseInt(singleQuery.data.id), singleQuery.data);
      }
    }, [singleQuery.data]);

    const { data: singlePaper, isLoading: isSingleLoading, isSuccess: isSingleSuccess, error: singleError } = singleQuery;
    const { data: fullData, isLoading: isFullLoading, isSuccess: isFullSuccess, error: fullError } = fullQuery;

    const paper = isCached
      ? paperCache.get(paperId)
      : useFullPapers
        ? fullData?.papers.find(p => parseInt(p.id) === paperId)
        : singlePaper;

    const isLoading = isCached ? false : useFullPapers ? isFullLoading : isSingleLoading;
    const isSuccess = isCached ? true : useFullPapers ? isFullSuccess : isSingleSuccess;
    const error = isCached ? undefined : useFullPapers ? fullError : singleError;

    return { paper, isLoading, isSuccess, error };
  }

  return { useGetPaper };
}

export default useFSMPapersManager;