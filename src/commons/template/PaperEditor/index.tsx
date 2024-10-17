import React, { FC } from "react";
import NormalPaperEditor from "./NormalPaperEditor";
import BoardPaperEditor from "./BoardPaperEditor";

type PaperEditorPropsType = {
  paperId: string;
  template?: 'normal' | 'board';
  mode?: 'contents' | 'problems' | 'all';
}

const PaperEditor: FC<PaperEditorPropsType> = ({
  paperId,
  template = 'normal',
  ...props
}) => {
  if (template === 'normal') {
    return <NormalPaperEditor paperId={paperId} {...props} />
  }
  if (template === 'board') {
    return <BoardPaperEditor paperId={paperId} {...props} />
  }
}

export default PaperEditor;