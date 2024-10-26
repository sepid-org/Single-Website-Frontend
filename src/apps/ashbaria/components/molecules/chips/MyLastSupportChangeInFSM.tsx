import React, { FC } from "react";
import { useGetUserLastResultInFSMQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportChip from "./Support";

type MyLastSupportChangeInFSMPropsType = {}

const MyLastSupportChangeInFSM: FC<MyLastSupportChangeInFSMPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data } = useGetUserLastResultInFSMQuery({ correspondingFsmId: fsmId })

  console.log(data?.support_change)

  return (
    <SupportChip value={data?.support_change} />
  )
}

export default MyLastSupportChangeInFSM;

