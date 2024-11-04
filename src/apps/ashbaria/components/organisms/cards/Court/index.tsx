import { CourtType } from "apps/ashbaria/types";
import React, { FC } from "react";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { useParams } from "react-router-dom";
import ActiveCourtCard from "./Active";
import FinishedCourtCard from "./Finished";
import LockedCourtCard from "./Locked";

type CourtCardPropsType = {
  court: CourtType;
}

const CourtCard: FC<CourtCardPropsType> = ({
  court,
}) => {
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const currentUserFSMStatus = userFSMsStatus?.find(status => status.fsm_id === court?.corresponding_fsm);

  if (currentUserFSMStatus?.count_of_playing > 0) {
    return <FinishedCourtCard court={court} />
  }

  if (currentUserFSMStatus?.enabled) {
    return <ActiveCourtCard court={court} />
  }

  return <LockedCourtCard court={court} />
}

export default CourtCard;