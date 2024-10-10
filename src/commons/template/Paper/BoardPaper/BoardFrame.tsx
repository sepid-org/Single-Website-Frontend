import React, { useState, useEffect, useRef, Fragment, FC, useCallback } from 'react';
import { Stack } from '@mui/material';

export type BoardFramePropsType = {
  containerWidth?: number;
  containerHeight?: number;
  children: any;
}

const BoardFrame: FC<BoardFramePropsType> = ({
  containerWidth = window.innerWidth,
  containerHeight = window.innerHeight,
  children,
}) => {
  const boardRef = useRef(null);
  const containerRef = useRef(null);
  const appbarRef = useRef(null);
  const BOARD_HEIGHT = 900;
  const BOARD_WIDTH = 1600;
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  const handleResize = useCallback(() => {
    if (boardRef.current && containerRef.current) {
      let appbarHeight = 0;
      if (appbarRef.current) {
        appbarHeight = appbarRef.current.offsetHeight;
      }
      const scale = (containerHeight - appbarHeight) / BOARD_HEIGHT;

      const scaledWidth = BOARD_WIDTH * scale;
      const scaledHeight = BOARD_HEIGHT * scale;

      const isScrollNeeded = scaledWidth > containerWidth;
      setIsScrollNeeded(isScrollNeeded);

      boardRef.current.style.height = `${scaledHeight}px`;
      boardRef.current.style.width = `${scaledWidth}px`;
      boardRef.current.style.transform = `scale(${scale})`;
      boardRef.current.style.transformOrigin = 'top left';

      containerRef.current.style.overflowX = isScrollNeeded ? 'auto' : 'hidden';
      containerRef.current.style.overflowY = 'hidden';
      containerRef.current.style.height = `${containerHeight - appbarHeight}px`;
    }
  }, [boardRef, containerRef, appbarRef]);

  const handleResizeThrottled = useCallback(() => {
    window.requestAnimationFrame(handleResize);
  }, [handleResize]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', handleResizeThrottled);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleResizeThrottled();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResizeThrottled);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
    };
  }, [handleResizeThrottled]);

  useEffect(() => {
    handleResizeThrottled();
  }, [children])


  const newChildren =
    <div
      ref={boardRef}
      style={{
        position: 'relative',
      }}
    >
      {children}
    </div>

  return (
    <Fragment>
      {isScrollNeeded ?
        <div ref={containerRef} >
          {newChildren}
        </div> :
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          ref={containerRef}>
          {newChildren}
        </Stack>
      }
    </Fragment>
  );
};

export default BoardFrame;