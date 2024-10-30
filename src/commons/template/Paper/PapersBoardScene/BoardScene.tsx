import React, { useState, useEffect, useRef, FC, useCallback, memo } from 'react';
import { Stack } from '@mui/material';

export type BoardScenePropsType = {
  parentWidth?: number;
  parentHeight?: number;
  boardWidth?: number;
  boardHeight?: number;
  mode: 'fit-width' | 'fit-height';
  children: React.ReactNode;
}

const BoardScene: FC<BoardScenePropsType> = memo(({
  parentWidth = window.innerWidth,
  parentHeight = window.innerHeight,
  boardWidth = 1600,
  boardHeight = 900,
  mode = 'fit-height',
  children,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  const handleResize = useCallback(() => {
    if (boardRef.current && containerRef.current) {
      const scaleHeight = parentHeight / boardHeight;
      const scaleWidth = parentWidth / boardWidth;

      const scale = mode === 'fit-height' ? scaleHeight : scaleWidth;

      const scaledWidth = boardWidth * scale;
      const scaledHeight = boardHeight * scale;

      const isScrollNeeded = mode === 'fit-height' ?
        scaledWidth > parentWidth :
        scaledHeight > parentHeight;

      setIsScrollNeeded(isScrollNeeded);

      Object.assign(boardRef.current.style, {
        height: `${scaledHeight}px`,
        width: `${scaledWidth}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      });

      Object.assign(containerRef.current.style, {
        overflowX: isScrollNeeded && mode === 'fit-height' ? 'auto' : 'hidden',
        overflowY: isScrollNeeded && mode === 'fit-width' ? 'auto' : 'hidden',
        height: `${parentHeight}px`,
        width: `${parentWidth}px`,
      });
    }
  }, [parentHeight, parentWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(handleResize);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleResize();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
    };
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [children, handleResize]);

  const newChildren = (
    <div ref={boardRef} style={{ position: 'relative' }}>
      {children}
    </div>
  );

  return (
    <>
      {isScrollNeeded ? (
        <div ref={containerRef}>{newChildren}</div>
      ) : (
        <Stack alignItems="center" justifyContent="center" ref={containerRef}>
          {newChildren}
        </Stack>
      )}
    </>
  );
});

export default BoardScene;