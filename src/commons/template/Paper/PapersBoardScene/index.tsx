import React, { FC } from 'react';
import PaperWidgets from 'commons/template/Paper/PapersBoardScene/PaperWidgets';
import BoardScene from 'commons/template/Paper/PapersBoardScene/BoardScene';
import { WidgetModes } from 'commons/components/organisms/Widget';

export type PapersBoardScenePropsType = {
  paperIds: string[];
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
  mode?: 'fit-height' | 'fit-width';
};

const PapersBoardScene: FC<PapersBoardScenePropsType> = ({
  paperIds = [],
  parentWidth,
  parentHeight,
  boardWidth,
  boardHeight,
  mode,
}) => {

  return (
    <BoardScene
      mode={mode}
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
