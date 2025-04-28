import React, { FC } from 'react';
import NoScrollContainer from './NoScrollContainer';

export type PropsType = {
  parentWidth?: number;
  parentHeight?: number;
  boardWidth: number;
  boardHeight: number;
  mode: 'fit-width' | 'fit-height';
  scale: number;
  children: React.ReactNode;
}

const ScrollNeededFrame: FC<PropsType> = ({
  parentWidth,
  parentHeight,
  boardWidth,
  boardHeight,
  mode,
  scale,
  children,
}) => {
  const scaledW = boardWidth * scale;
  const scaledH = boardHeight * scale;

  return (
    <div
      style={{
        width: `${parentWidth}px`,
        height: `${parentHeight}px`,
        position: 'relative',
        overflowX: mode === 'fit-height' ? 'auto' : 'hidden',
        overflowY: mode === 'fit-width' ? 'auto' : 'hidden',
      }}
    >
      <NoScrollContainer
        parentWidth={scaledW}
        parentHeight={scaledH}
        boardWidth={scaledW}
        boardHeight={scaledH}
        scale={scale}
      >
        {children}
      </NoScrollContainer>
    </div >
  );
};

export default ScrollNeededFrame;