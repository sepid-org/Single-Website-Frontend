import React, { useState, useEffect, useRef, useMemo, Fragment, FC, useCallback } from 'react';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetObjectsByPaperQuery } from 'apps/website-display/redux/features/object/ObjectSlice';
import { PositionType } from 'commons/types/widgets/widget';
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
  const { data: objects } = useGetObjectsByPaperQuery({ paperId });
  const [positions, setPositions] = useState<PositionType[]>([]);
  const boardRef = useRef(null);
  const containerRef = useRef(null);
  const appbarRef = useRef(null);
  const BOARD_HEIGHT = 900;
  const BOARD_WIDTH = 1600;
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  useEffect(() => {
    if (objects) {
      setPositions(objects.map(object => object.position));
    }
  }, [objects]);

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
      const position = positions.find(position => position.widget === widget.id);
      return {
        ...widget,
        ...position
      };
    });
  }, [paper?.widgets, positions]);

  useEffect(() => {
    handleResizeThrottled();
  }, [widgetsWithPositions])

  console.log(objectLogics)

  const widgetsComponents = useMemo(() =>
    <div ref={boardRef} style={{
      position: 'relative',
    }}>
      {widgetsWithPositions.map((widget) => {
        const object = objects?.find(object => object.widget === widget.id);
        if (!object) return null;
        return (
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
              <ObjectWrapper object={object} logic={objectLogics.find(objectLogic => objectLogic.objectName === object.name)}>
                <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.View} />
              </ObjectWrapper>
            </div>
          </div>
        );
      })}
    </div >,
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