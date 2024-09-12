import React, { useState, useEffect, useRef, useMemo, Fragment, FC, useCallback } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetPositionsByPaperQuery } from 'apps/website-display/redux/features/object/PositionSlice';
import { PositionType, WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import { Box, Stack } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';

export type BoardFSMStatePropsType = {
  isMentor: boolean;
  stateId: string;
  playerId: string;
}

const BoardFSMState: FC<BoardFSMStatePropsType> = ({ isMentor, stateId, playerId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId: stateId });
  const { data: paper } = useGetPaperQuery({ paperId: stateId }, { skip: !stateId });
  const [positions, setPositions] = useState<PositionType[]>([]);
  const { data: initialPositions } = useGetPositionsByPaperQuery({ paperId: stateId });
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
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      let appbarHeight = 0;
      if (appbarRef.current) {
        appbarHeight = appbarRef.current.offsetHeight;
      }
      const scale = (windowHeight - appbarHeight) / BOARD_HEIGHT;

      const scaledWidth = BOARD_WIDTH * scale;
      const scaledHeight = BOARD_HEIGHT * scale;

      const isScrollNeeded = scaledWidth > windowWidth;
      setIsScrollNeeded(isScrollNeeded);

      boardRef.current.style.height = `${scaledHeight}px`;
      boardRef.current.style.width = `${scaledWidth}px`;
      boardRef.current.style.transform = `scale(${scale})`;
      boardRef.current.style.transformOrigin = 'top left';

      containerRef.current.style.overflowX = isScrollNeeded ? 'auto' : 'hidden';
      containerRef.current.style.overflowY = 'hidden';
      containerRef.current.style.height = `${windowHeight - appbarHeight}px`;
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
            <Widget coveredWithPaper={false} widget={widget} paperId={stateId} mode={WidgetModes.View} />
          </div>
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 400,
          width: 200,
          height: 100,
        }}
      >
        <FSMNextStateButton outwardEdges={fsmState.outward_edges} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 300,
          top: 100,
          width: 200,
          height: 100,
        }}
      >
        <FSMBackStateButton playerId={playerId} inwardEdges={fsmState.inward_edges} />
      </div>
    </div>,
    [widgetsWithPositions, fsmState])

  console.log("slama")

  return (
    <Fragment>
      {fsmState.show_appbar &&
        <Box ref={appbarRef} >
          <Appbar mode={isMentor ? 'MENTOR_FSM' : 'FSM'} position='relative' />
        </Box>
      }
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

export default BoardFSMState;