import React, { useState, useEffect, useRef, useMemo, Fragment, FC, useCallback } from 'react';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetPositionsByPaperQuery } from 'apps/website-display/redux/features/object/PositionSlice';
import { PositionType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { Stack } from '@mui/material';

export type BoardPaperPropsType = {
  paperId: string;
  containerWidth?: number;
  containerHeight?: number;
}

const BoardPaper: FC<BoardPaperPropsType> = ({ paperId, containerWidth = window.innerWidth, containerHeight = window.innerHeight }) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });
  const { data: initialPositions } = useGetPositionsByPaperQuery({ paperId });
  const [positions, setPositions] = useState<PositionType[]>([]);
  const boardRef = useRef(null);
  const containerRef = useRef(null);
  const appbarRef = useRef(null);
  const BOARD_HEIGHT = 900;
  const BOARD_WIDTH = 1600;
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  useEffect(() => {
    if (initialPositions) {
      setPositions(initialPositions);
    }
  }, [initialPositions]);

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

  const widgetsWithPositions = useMemo(() => {
    if (!paper || !positions) return [];
    const widgets = paper.widgets;
    return widgets.map(widget => {
      const position = positions.find(pos => pos.widget === widget.id) || {
        x: Math.round(Math.random() * 400),
        y: Math.round(Math.random() * 400),
        width: 200,
        height: 200
      };
      return {
        ...widget,
        ...position
      };
    });
  }, [paper?.widgets, positions]);

  useEffect(() => {
    handleResizeThrottled();
  }, [widgetsWithPositions])

  const widgetsComponents = useMemo(() =>
    <div ref={boardRef} style={{
      position: 'relative',
    }}>
      {widgetsWithPositions.map((widget) => (
        <div
          key={widget.id}
          style={{
            position: 'absolute',
            left: widget.x,
            top: widget.y,
            width: widget.width,
            height: widget.height,
          }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.View} />
          </div>
        </div>
      ))}
    </div>,
    [widgetsWithPositions])

  return (
    <Fragment>
      {isScrollNeeded ?
        <div ref={containerRef} >
          {widgetsComponents}
        </div> :
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          ref={containerRef}>
          {widgetsComponents}
        </Stack>
      }
    </Fragment>
  );
};

export default BoardPaper;