import React, { FC, useEffect } from "react";
import { useGetUserLastSupportPercentageInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportPercentageChip from "./SupportPercentage";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

type PropsType = {
  fsmStateId?: string;
  forceRefetch?: boolean;
}

const MyLastSupportPercentageInCourt: FC<PropsType> = ({ fsmStateId, forceRefetch }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data, isLoading, refetch } = useGetUserLastSupportPercentageInCourtQuery({ correspondingFsmId: fsmId })
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

  const PAPER_ID_WHICH_CONTAINS_PERCENTAGE_SUPPORT_CHANGE = '7337';

  useEffect(() => {
    if (fsmState && fsmState.papers.includes(PAPER_ID_WHICH_CONTAINS_PERCENTAGE_SUPPORT_CHANGE)) {
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

