import { useEffect, useState, useSyncExternalStore } from 'react';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMAllPapersQuery } from '../redux/slices/fsm/FSMSlice';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';

type PropsType = {
  paperId: string;
};

// Shared flag and subscribers for all hook instances
let sharedUseFullPapers = false;
const subscribers = new Set<() => void>();

// Notify all subscribers of flag change
const notifySubscribers = () => {
  Array.from(subscribers).forEach((callback) => callback());
};

// After 3 seconds, flip the flag and notify
setTimeout(() => {
  sharedUseFullPapers = true;
  notifySubscribers();
}, 3_000);

// Hook to subscribe to the shared flag
function useSharedUseFullPapers() {
  return useSyncExternalStore(
    (callback) => {
      subscribers.add(callback);
      return () => { subscribers.delete(callback); };
    },
    () => sharedUseFullPapers
  );
}

// Module‑level cache shared across all hook instances
const paperCache = new Map<string, any>();

const useGetPaper = ({ paperId }: PropsType) => {
  const { fsmId } = useFSMContext();
  const useFullPapers = useSharedUseFullPapers();

  // Query single paper until shared flag is true
  const {
    data: singlePaper,
    isLoading: isSingleLoading,
    isSuccess: isSingleSuccess,
    error: singleError,
  } = useGetPaperQuery(
    { paperId },
    { skip: useFullPapers }
  );

  // Query full papers list once shared flag is true
  const {
    data: fullPapersData,
    isLoading: isFullLoading,
    isSuccess: isFullSuccess,
    error: fullError,
  } = useGetFSMAllPapersQuery(
    { fsmId },
    { skip: !useFullPapers }
  );

  // Populate cache on single–paper success
  useEffect(() => {
    if (singlePaper) paperCache.set(singlePaper.id, singlePaper);
  }, [singlePaper]);

  // Populate cache on full–papers success
  useEffect(() => {
    if (fullPapersData?.papers) {
      for (const p of fullPapersData.papers) {
        paperCache.set(p.id, p);
      }
    }
  }, [fullPapersData]);

  const isCached = paperCache.has(paperId);

  // Final paper comes from cache first, then active query
  const paper = paperCache.get(paperId)
    ?? (useFullPapers
      ? fullPapersData?.papers.find((p) => p.id === paperId)
      : singlePaper
    );

  // Mirror loading/success/error from active query unless cached
  const isLoading = isCached
    ? false
    : useFullPapers
      ? isFullLoading
      : isSingleLoading;

  const isSuccess = isCached
    ? true
    : useFullPapers
      ? isFullSuccess
      : isSingleSuccess;

  const error = isCached
    ? undefined
    : useFullPapers
      ? fullError
      : singleError;

  return { paper, isLoading, isSuccess, error };
};

export default useGetPaper;