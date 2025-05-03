import { useEffect, useState } from "react";
import { useFSMContext } from "commons/hooks/useFSMContext";
import { useGetFSMAllPapersQuery } from "../redux/slices/fsm/FSMSlice";
import { useGetPaperQuery } from "apps/website-display/redux/features/paper/PaperSlice";

type PropsType = {
  paperId: string;
};

// module‑level cache shared across all hook instances
const paperCache = new Map<string, any>();

const useGetPaper = ({ paperId }: PropsType) => {
  const { fsmId } = useFSMContext();
  const [useFullPapers, setUseFullPapers] = useState(false);

  // after 3 s switch from single‐item to full‐list
  useEffect(() => {
    const timer = setTimeout(() => setUseFullPapers(true), 3_000);
    return () => clearTimeout(timer);
  }, []);

  // fire single‐paper query until useFullPapers flips
  const {
    data: singlePaper,
    isLoading: isSingleLoading,
    isSuccess: isSingleSuccess,
    error: singleError,
  } = useGetPaperQuery(
    { paperId },
    { skip: useFullPapers }
  );

  // fire full‐papers query once useFullPapers is true
  const {
    data: fullPapersData,
    isLoading: isFullLoading,
    isSuccess: isFullSuccess,
    error: fullError,
  } = useGetFSMAllPapersQuery(
    { fsmId },
    { skip: !useFullPapers }
  );

  // populate cache on single‐paper success
  useEffect(() => {
    if (singlePaper) {
      paperCache.set(singlePaper.id, singlePaper);
    }
  }, [singlePaper]);

  // populate cache on full‐papers success
  useEffect(() => {
    if (fullPapersData?.papers) {
      for (const p of fullPapersData.papers) {
        paperCache.set(p.id, p);
      }
    }
  }, [fullPapersData]);

  const isCached = paperCache.has(paperId);

  // final paper: cache first, then whichever query is active
  const paper = paperCache.get(paperId)
    ?? (useFullPapers
      ? fullPapersData?.papers.find((p) => p.id === paperId)
      : singlePaper
    );

  // mirror loading/success/error from the “live” query unless we’re already cached
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