import React, { FC } from "react";
import { useGetUserLastSupportPercentageChangeInCourtQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportPercentageChip from "./SupportPercentage";

type PropsType = {}

const MyLastSupportPercentageChangeInCourt: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data, isFetching } = useGetUserLastSupportPercentageChangeInCourtQuery({ correspondingFsmId: fsmId })

  return (
    <SupportPercentageChip value={data} isFetching={isFetching} />
  )
}

export default MyLastSupportPercentageChangeInCourt;

