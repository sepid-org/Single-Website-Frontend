import React, { FC } from 'react';
import BoardPaperWidgets from 'commons/template/Paper/BoardPaper/BoardPaperWidgets';
import BoardFrame from 'commons/template/Paper/BoardPaper/BoardFrame';
import { ObjectLogicType } from 'commons/types/models';

export type BoardFSMStatePropsType = {
  paperIds: string[];
  containerHeight?: number;
  objectLogics?: ObjectLogicType[];
};

const BoardPaper: FC<BoardFSMStatePropsType> = ({
  paperIds,
  containerHeight,
  objectLogics,
}) => {

  return (
    <BoardFrame containerHeight={containerHeight}>
      {paperIds.map(paperId => (
        <BoardPaperWidgets key={paperId} objectLogics={objectLogics} paperId={paperId} />
      ))}
    </BoardFrame>
  );
};

export default BoardPaper;
