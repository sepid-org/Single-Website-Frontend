import React, { FC } from 'react';
import ScrollNeededFrame from './ScrollNeededFrame';
import NoScrollContainer from './NoScrollContainer';

export type BoardScenePropsType = {
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
  mode: 'fit-width' | 'fit-height';
  children: React.ReactNode;
}

const Frame: FC<BoardScenePropsType> = ({
  parentWidth = window.innerWidth,
  parentHeight = window.innerHeight,
  boardWidth = 1600,
  boardHeight = 900,
  mode = 'fit-height',
  children,
}) => {
  const heightScale = parentHeight / boardHeight;
  const widthScale = parentWidth / boardWidth;

  const scale = mode === 'fit-height' ? heightScale : widthScale;

  const scaledWidth = boardWidth * scale;
  const scaledHeight = boardHeight * scale;

  const isScrollNeeded = mode === 'fit-height' ?
    scaledWidth > parentWidth :
    scaledHeight > parentHeight;

  if (isScrollNeeded) {
    return (
      <ScrollNeededFrame
        parentWidth={parentWidth}
        parentHeight={parentHeight}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        mode={mode}
        scale={scale}
      >
        {children}
      </ScrollNeededFrame>
    )
  } else {
    return (
      <NoScrollContainer
        scale={scale}
        parentWidth={parentWidth}
        parentHeight={parentHeight}
        boardWidth={scaledWidth}
        boardHeight={scaledHeight}
      >
        {children}
      </NoScrollContainer>
    );
  }
};

export default Frame;