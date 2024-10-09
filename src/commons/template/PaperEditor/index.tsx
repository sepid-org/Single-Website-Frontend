import React, { FC } from "react";
import NormalPaperEditor from "./NormalPaperEditor";
import BoardPaperEditor from "./BoardPaperEditor";

type PaperEditorPropsType = {
  template?: 'normal' | 'board';
  paperId: string;
  fsmStateId?: string;
  mode?: 'contents' | 'problems' | 'all';
}

const PaperEditor: FC<PaperEditorPropsType> = ({
  template = 'normal',
  paperId,
  fsmStateId,
  ...props
}) => {
  if (template === 'normal') {
    return <NormalPaperEditor fsmStateId={fsmStateId} paperId={paperId} {...props} />
  }
  if (template === 'board') {
    return <BoardPaperEditor fsmStateId={fsmStateId} paperId={paperId} {...props} />
  }
}

export default PaperEditor;