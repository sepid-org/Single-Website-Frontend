import React, { FC } from "react";
import { useGetUserLastResultInFSMQuery } from "apps/ashbaria/redux/slices/GameLogics";
import { useParams } from "react-router-dom";
import SupportChip from "./Support";

type MyLastSupportInFSMPropsType = {}

const MyLastSupportInFSM: FC<MyLastSupportInFSMPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const { data, isLoading } = useGetUserLastResultInFSMQuery({ correspondingFsmId: fsmId })

  return (
    <SupportChip value={data?.support_percentage} isLoading={isLoading} />
  )
}

export default MyLastSupportInFSM;

