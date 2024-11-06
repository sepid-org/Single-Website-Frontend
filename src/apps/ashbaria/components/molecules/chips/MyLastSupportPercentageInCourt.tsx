import React, { FC } from "react";
import { useGetUserLastSupportPercentageInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportPercentageChip from "./SupportPercentage";

type PropsType = {}

const MyLastSupportPercentageInCourt: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data, isLoading } = useGetUserLastSupportPercentageInCourtQuery({ correspondingFsmId: fsmId })

  return (
    <SupportPercentageChip value={data} isLoading={isLoading} />
  )
}

export default MyLastSupportPercentageInCourt;

