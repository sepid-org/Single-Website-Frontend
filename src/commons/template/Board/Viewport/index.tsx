import React, { FC } from 'react';
import ScrollNeededViewport from './ScrollNeededViewport';
import NoScrollViewport from './NoScrollViewport';
import { ViewportType } from '../types';

export type PropsType = ViewportType & {
  mode: 'fit-width' | 'fit-height';
  children: React.ReactNode;
}

const Viewport: FC<PropsType> = ({
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
  defaultSceneWidth,
  defaultSceneHeight,
  mode = 'fit-height',
  children,
}) => {
  const heightScale = viewportHeight / defaultSceneHeight;
  const widthScale = viewportWidth / defaultSceneWidth;

  const scale = mode === 'fit-height' ? heightScale : widthScale;

  const scaledSceneWidth = defaultSceneWidth * scale;
  const scaledSceneHeight = defaultSceneHeight * scale;

  const isScrollNeeded = mode === 'fit-height' ?
    scaledSceneWidth > viewportWidth :
    scaledSceneHeight > viewportHeight;

  if (isScrollNeeded) {
    return (
      <ScrollNeededViewport
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
        defaultSceneWidth={defaultSceneWidth}
        defaultSceneHeight={defaultSceneHeight}
        mode={mode}
        scale={scale}
      >
        {children}
      </ScrollNeededViewport>
    )
  } else {
    return (
      <NoScrollViewport
        scale={scale}
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
        defaultSceneWidth={scaledSceneWidth}
        defaultSceneHeight={scaledSceneHeight}
      >
        {children}
      </NoScrollViewport>
    );
  }
};

export default Viewport;