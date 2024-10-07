import React, { FC } from "react";
import NormalPaperEditor from "./NormalPaperEditor";
import BoardPaperEditor from "./BoardPaperEditor";

type PaperEditorPropsType = {
  template?: 'normal' | 'board';
  paperId: string;
  mode?: 'contents' | 'problems' | 'all';
}

const PaperEditor: FC<PaperEditorPropsType> = ({
  template = 'normal',
  paperId,
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