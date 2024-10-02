import React, { useState, useEffect, useRef, useMemo, Fragment, FC, useCallback } from 'react';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { Stack } from '@mui/material';
import ObjectWrapper from 'commons/components/organisms/ObjectWrapper';
import { ObjectLogicType } from 'commons/types/models';

export type BoardPaperPropsType = {
  paperId: string;
  containerWidth?: number;
  containerHeight?: number;
  objectLogics?: ObjectLogicType[];
}

const BoardPaper: FC<BoardPaperPropsType> = ({
  paperId,
  containerWidth = window.innerWidth,
  containerHeight = window.innerHeight,
  objectLogics = [],
}) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });
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
  }, [paper])

  const widgets = [...paper?.widgets || []].sort((w1, w2) => (parseInt(w1.order) - parseInt(w2.order)));

  const widgetsComponents = useMemo(() =>
    <div ref={boardRef} style={{
      position: 'relative',
    }}>
      {widgets.map((widget, index) =>
        <div
          key={widget.id}
          style={{
            position: 'absolute',
            left: widget.position?.x || index * 10,
            top: widget.position?.y || index * 10,
            width: widget.position?.width || 100,
            height: widget.position?.height || 100,
          }}
        >
          <ObjectWrapper logic={objectLogics.find(objectLogic => objectLogic.name === widget.name)}>
            <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.View} />
          </ObjectWrapper>
        </div>
      )}
    </div >,
    [widgets])

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