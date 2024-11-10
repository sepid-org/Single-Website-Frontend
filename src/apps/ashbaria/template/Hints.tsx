import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import Hint from "../components/organisms/hint/Hint";
import NoHintFound from "../components/organisms/hint/NoHintFound";
import Hints from "../components/organisms/hint/Hints";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useGetHintsByObjectIdQuery } from "commons/redux/apis/cms/hint/GeneralHint";
import useLocalNavigate from "../hooks/useLocalNavigate";

type HintsTemplatePropsType = {}

const HintsTemplate: FC<HintsTemplatePropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: hints } = useGetHintsByObjectIdQuery(fsm?.object_id, { skip: !Boolean(fsm?.object_id) })

  const onClose = () => {
    localNavigate(`/court/${fsmId}/`);
  }

  if (hints?.length === 0) {
    return (
      <NoHintFound onClose={onClose} />
    )
  }

  if (hints?.length === 1) {
    return (
      <Hint onClose={onClose} hint={hints?.[0]} />
    )
  }

  return (
    <Hints targetObjectId={fsm?.object_id} />
  )
}

export default HintsTemplate;