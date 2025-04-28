import React, { FC } from 'react';

export type PropsType = {
  parentWidth: number;
  parentHeight: number;
  boardWidth: number;
  boardHeight: number;
  children: React.ReactNode;
  scale: number;
}

const NoScrollContainer: FC<PropsType> = ({
  parentWidth,
  parentHeight,
  boardWidth,
  boardHeight,
  scale,
  children,
}) => {

  return (
    <div
      style={{
        position: 'relative',
        width: parentWidth,
        height: parentHeight,
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
          width: `${boardWidth}px`,
          height: `${boardHeight}px`,
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

export default NoScrollContainer;