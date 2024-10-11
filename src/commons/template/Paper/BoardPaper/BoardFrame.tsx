import React, { useState, useEffect, useRef, FC, useCallback, memo } from 'react';
import { Stack } from '@mui/material';

export type BoardFramePropsType = {
  containerWidth?: number;
  containerHeight?: number;
  children: React.ReactNode;
}

const BoardFrame: FC<BoardFramePropsType> = memo(({
  containerWidth = window.innerWidth,
  containerHeight = window.innerHeight,
  children,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appbarRef = useRef<HTMLDivElement>(null);
  const BOARD_HEIGHT = 900;
  const BOARD_WIDTH = 1600;
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  const handleResize = useCallback(() => {
    if (boardRef.current && containerRef.current) {
      const appbarHeight = appbarRef.current?.offsetHeight || 0;
      const scale = (containerHeight - appbarHeight) / BOARD_HEIGHT;

      const scaledWidth = BOARD_WIDTH * scale;
      const scaledHeight = BOARD_HEIGHT * scale;

      const isScrollNeeded = scaledWidth > containerWidth;
      setIsScrollNeeded(isScrollNeeded);

      Object.assign(boardRef.current.style, {
        height: `${scaledHeight}px`,
        width: `${scaledWidth}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      });

      Object.assign(containerRef.current.style, {
        overflowX: isScrollNeeded ? 'auto' : 'hidden',
        overflowY: 'hidden',
        height: `${containerHeight - appbarHeight}px`,
      });
    }
  }, [containerHeight, containerWidth]);

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

export default BoardFrame;