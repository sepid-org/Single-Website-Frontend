import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import Hint from "../components/organisms/hint/Hint";
import NoHintFound from "../components/organisms/hint/NoHintFound";
import { useGetFSMStateHintsQuery } from "apps/website-display/redux/features/hint/HintSlice";
import Hints from "../components/organisms/hint/Hints";

type HintsTemplatePropsType = {
  onClose: any;
}

const HintsTemplate: FC<HintsTemplatePropsType> = ({
  onClose,
}) => {
  const { fsmId } = useParams();
  const { data: currentUserPlayer } = useGetMyPlayerQuery({ fsmId });
  const fsmStateId = currentUserPlayer?.current_state;
  const { data: hints } = useGetFSMStateHintsQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });

  if (hints?.length === 0) {
    return (
      <NoHintFound onClose={onClose} />
    )
  }

  if (hints?.length === 1) {
    return (
      <Hint onClose={onClose} hintId={hints[0].id} />
    )
  }

  return (
    <Hints referenceId={fsmStateId} />
  )
}

export default HintsTemplate;