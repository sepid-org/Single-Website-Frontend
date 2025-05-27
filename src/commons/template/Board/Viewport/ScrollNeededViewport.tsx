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
        overflowX: 'auto',
        overflowY: 'auto',
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