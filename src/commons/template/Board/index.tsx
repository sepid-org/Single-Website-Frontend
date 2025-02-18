import React, { FC } from 'react';
import Layer from 'commons/template/Board/Layer';
import Frame from 'commons/template/Board/Frame';
import { WidgetModes } from 'commons/components/organisms/Widget';

export type PropsType = {
  paperIds: string[];
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
  mode?: 'fit-height' | 'fit-width';
};

const Board: FC<PropsType> = ({
  paperIds = [],
  parentWidth,
  parentHeight,
  boardWidth,
  boardHeight,
  mode,
}) => {

  return (
    <Frame
      mode={mode}
      boardHeight={boardHeight}
      boardWidth={boardWidth}
      parentHeight={parentHeight}
      parentWidth={parentWidth}
    >
      {paperIds.map(paperId => (
        <Layer key={paperId} paperId={paperId} widgetsMode={WidgetModes.View} />
      ))}
    </Frame>
  );
};

export default Board;
