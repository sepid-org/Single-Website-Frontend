import React, { FC } from 'react';
import PaperWidgets from 'commons/template/Paper/PapersBoardScene/PaperWidgets';
import BoardScene from 'commons/template/Paper/PapersBoardScene/BoardScene';
import { ComplementaryObjectType } from 'commons/types/models';
import { WidgetModes } from 'commons/components/organisms/Widget';

export type PapersBoardScenePropsType = {
  paperIds: string[];
  sceneWidth?: number;
  sceneHeight?: number;
  complementaryObjects?: ComplementaryObjectType[];
};

const PapersBoardScene: FC<PapersBoardScenePropsType> = ({
  paperIds = [],
  sceneWidth = window.innerWidth,
  sceneHeight = window.innerHeight,
  complementaryObjects = [],
}) => {

  return (
    <BoardScene sceneHeight={sceneHeight} sceneWidth={sceneWidth}>
      {paperIds.map(paperId => (
        <PaperWidgets complementaryObjects={complementaryObjects} key={paperId} paperId={paperId} widgetsMode={WidgetModes.View} />
      ))}
    </BoardScene>
  );
};

export default PapersBoardScene;
