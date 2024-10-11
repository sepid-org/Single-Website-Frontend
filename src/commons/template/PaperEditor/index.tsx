import React, { FC } from "react";
import NormalPaperEditor from "./NormalPaperEditor";
import BoardPaperEditor from "./BoardPaperEditor";
import { useGetFSMStateQuery } from "apps/fsm/redux/slices/fsm/FSMStateSlice";

type PaperEditorPropsType = {
  paperId: string;
  fsmStateId?: string;
  mode?: 'contents' | 'problems' | 'all';
}

const PaperEditor: FC<PaperEditorPropsType> = ({
  paperId,
  fsmStateId,
  ...props
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  if (fsmState?.template === 'normal') {
    return <NormalPaperEditor fsmStateId={fsmStateId} paperId={paperId} {...props} />
  }
  if (fsmState?.template === 'board') {
    return <BoardPaperEditor fsmStateId={fsmStateId} paperId={paperId} {...props} />
  }
}

export default PaperEditor;