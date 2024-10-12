import React, { FC } from 'react';
import BoardPaperWidgets from 'commons/template/Paper/BoardPaper/BoardPaperWidgets';
import BoardFrame from 'commons/template/Paper/BoardPaper/BoardFrame';
import { ComplementaryObjectType } from 'commons/types/models';

export type BoardFSMStatePropsType = {
  paperIds: string[];
  containerHeight?: number;
  complementaryObjects?: ComplementaryObjectType[];
};

const BoardPaper: FC<BoardFSMStatePropsType> = ({
  paperIds,
  containerHeight,
  complementaryObjects,
}) => {

  return (
    <BoardFrame containerHeight={containerHeight}>
      {paperIds.map(paperId => (
        <BoardPaperWidgets key={paperId} complementaryObjects={complementaryObjects} paperId={paperId} />
      ))}
    </BoardFrame>
  );
};

export default BoardPaper;
