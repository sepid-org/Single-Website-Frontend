import React, { FC } from 'react';
import BoardPaperWidgets from 'commons/template/Paper/BoardPaper/BoardPaperWidgets';
import BoardFrame from 'commons/template/Paper/BoardPaper/BoardFrame';
import { ComplementaryObjectType } from 'commons/types/models';
import useCustomWidgets from 'commons/hooks/useCustomWidgets';
import { WidgetModes } from 'commons/components/organisms/Widget';

export type BoardFSMStatePropsType = {
  paperIds: string[];
  containerHeight?: number;
  complementaryObjects?: ComplementaryObjectType[];
};

const BoardPaper: FC<BoardFSMStatePropsType> = ({
  paperIds,
  containerHeight,
  complementaryObjects: initialComplementaryObjects,
}) => {
  // todo: TOF
  const { complementaryObjects } = useCustomWidgets();

  const combinedComplementaryObjects = [
    ...(initialComplementaryObjects || []),
    ...(complementaryObjects || []),
  ]

  return (
    <BoardFrame containerHeight={containerHeight}>
      {paperIds.map(paperId => (
        <BoardPaperWidgets key={paperId} complementaryObjects={combinedComplementaryObjects} paperId={paperId} mode={WidgetModes.View} />
      ))}
    </BoardFrame>
  );
};

export default BoardPaper;
