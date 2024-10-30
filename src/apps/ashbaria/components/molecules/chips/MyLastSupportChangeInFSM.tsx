import React, { FC } from "react";
import { useGetUserLastResultInFSMQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportChip from "./Support";

type MyLastSupportChangeInFSMPropsType = {}

const MyLastSupportChangeInFSM: FC<MyLastSupportChangeInFSMPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data, isLoading } = useGetUserLastResultInFSMQuery({ correspondingFsmId: fsmId })

  return (
    <SupportChip value={data?.support_change} isLoading={isLoading} />
  )
}

export default MyLastSupportChangeInFSM;

