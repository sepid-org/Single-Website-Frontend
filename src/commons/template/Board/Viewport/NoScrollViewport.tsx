import React, { FC } from 'react';
import { ViewportType } from '../types';

export type PropsType = ViewportType & {
  children: React.ReactNode;
  scale: number;
}

const NoScrollViewport: FC<PropsType> = ({
  viewportWidth,
  viewportHeight,
  defaultSceneWidth,
  defaultSceneHeight,
  scale,
  children,
}) => {

  return (
    <div
      style={{
        position: 'relative',
        width: viewportWidth,
        height: viewportHeight,
        overflow: 'hidden',
      }}
    >
      {/* wrapper just for centering */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${defaultSceneWidth}px`,
          height: `${defaultSceneHeight}px`,
        }}
      >
        {/* inner div just for scaling */}
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default NoScrollViewport;