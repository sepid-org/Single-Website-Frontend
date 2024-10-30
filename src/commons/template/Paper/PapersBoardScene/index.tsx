import React, { FC } from 'react';
import PaperWidgets from 'commons/template/Paper/PapersBoardScene/PaperWidgets';
import BoardScene from 'commons/template/Paper/PapersBoardScene/BoardScene';
import { ComplementaryObjectType } from 'commons/types/models';
import { WidgetModes } from 'commons/components/organisms/Widget';

export type PapersBoardScenePropsType = {
  paperIds: string[];
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
};

const PapersBoardScene: FC<PapersBoardScenePropsType> = ({
  paperIds = [],
  parentWidth = window.innerWidth,
  parentHeight = window.innerHeight,
  boardWidth = 1600,
  boardHeight = 900,
}) => {

  return (
    <BoardScene
      boardHeight={boardHeight}
      boardWidth={boardWidth}
      parentHeight={parentHeight}
      parentWidth={parentWidth}
    >
      {paperIds.map(paperId => (
        <PaperWidgets key={paperId} paperId={paperId} widgetsMode={WidgetModes.View} />
      ))}
    </BoardScene>
  );
};

export default PapersBoardScene;
