import React, { FC } from 'react';
import NoScrollViewport from './NoScrollViewport';
import { ViewportType } from '../types';

export type PropsType = ViewportType & {
  mode: 'fit-width' | 'fit-height';
  scale: number;
  children: React.ReactNode;
};

const ScrollNeededViewport: FC<PropsType> = ({
  viewportWidth,
  viewportHeight,
  defaultSceneWidth,
  defaultSceneHeight,
  scale,
  mode,
  children,
}) => {
  const scaledW = defaultSceneWidth * scale;
  const scaledH = defaultSceneHeight * scale;

  return (
    <div
      style={{
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        position: 'relative',
        overflowX: mode === 'fit-height' ? 'auto' : 'hidden',
        overflowY: mode === 'fit-width' ? 'auto' : 'hidden',
      }}
    >
      <NoScrollViewport
        viewportWidth={scaledW}
        viewportHeight={scaledH}
        defaultSceneWidth={scaledW}
        defaultSceneHeight={scaledH}
        scale={scale}
      >
        {children}
      </NoScrollViewport>
    </div >
  );
};

export default ScrollNeededViewport;