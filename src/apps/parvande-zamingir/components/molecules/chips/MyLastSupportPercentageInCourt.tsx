import React, { FC, useEffect } from "react";
import { useGetUserLastSupportPercentageInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportPercentageChip from "./SupportPercentage";
import useFSMState from "apps/fsm/hooks/useFSMState";
import { useFSMStateContext } from "commons/hooks/useFSMStateContext";

type PropsType = {
  forceRefetch?: boolean;
}

const MyLastSupportPercentageInCourt: FC<PropsType> = ({ forceRefetch }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data, isLoading, refetch } = useGetUserLastSupportPercentageInCourtQuery({ correspondingFsmId: fsmId })
  const { fsmStateId } = useFSMStateContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId));

  const PAPER_ID_WHICH_CONTAINS_PERCENTAGE_SUPPORT_CHANGE = 7337;

  useEffect(() => {
    if (fsmState && fsmState.papers.includes(PAPER_ID_WHICH_CONTAINS_PERCENTAGE_SUPPORT_CHANGE as any)) {
      refetch();
    }
  }, [fsmState])

  useEffect(() => {
    if (forceRefetch) {
      refetch();
    }
  }, [forceRefetch])

  return (
    <SupportPercentageChip value={data} isLoading={isLoading} />
  )
}

export default MyLastSupportPercentageInCourt;

