import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetPositionsByPaperQuery } from 'apps/website-display/redux/features/object/PositionSlice';
import { PositionType, WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';
import { Stack } from '@mui/material';

const BoardFSMState = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [widgetsWithPositions, setWidgetsWithPositions] = useState<(WidgetType & PositionType)[]>([]);
  const { data: widgetPositions } = useGetPositionsByPaperQuery({ paperId: fsmStateId });
  const boardRef = useRef(null);
  const containerRef = useRef(null);
  const BOARD_HEIGHT = 900;
  const BOARD_WIDTH = 1600;
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);

  useEffect(() => {
    if (!paper || !widgetPositions) return;
    const widgets = paper.widgets;
    const mergeWidgetsAndPositions = () => {
      return widgets.map(widget => {
        const position = widgetPositions.find(pos => pos.widget === widget.id) || {
          x: Math.random() * 400,
          y: Math.random() * 400,
          width: 200,
          height: 200
        };
        return {
          ...widget,
          ...position
        };
      });
    };

    const merged = mergeWidgetsAndPositions();
    setWidgetsWithPositions(merged);
  }, [paper, widgetPositions]);

  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current && containerRef.current) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scale = windowHeight / BOARD_HEIGHT;

        const scaledWidth = BOARD_WIDTH * scale;
        const scaledHeight = BOARD_HEIGHT * scale;

        const isScrollNeeded = scaledWidth > windowWidth;
        setIsScrollNeeded(isScrollNeeded);

        boardRef.current.style.height = `${scaledHeight}px`; // ok
        boardRef.current.style.width = `${scaledWidth}px`; // ok
        boardRef.current.style.transform = `scale(${scale})`;
        boardRef.current.style.transformOrigin = 'top left';

        containerRef.current.style.overflowX = isScrollNeeded ? 'auto' : 'hidden';
        containerRef.current.style.overflowY = 'hidden';
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [widgetsWithPositions]);

  const widgets = useMemo(() =>
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
            <Widget coveredWithPaper={false} widget={widget} paperId={fsmStateId} mode={WidgetModes.View} />
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
        <FSMBackStateButton playerId='' inwardEdges={fsmState.inward_edges} />
      </div>
    </div>, [widgetsWithPositions])

  return (
    <Fragment>
      {isScrollNeeded ?
        <div ref={containerRef} >
          {widgets}
        </div > :
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          ref={containerRef}>
          {widgets}
        </Stack>
      }
    </Fragment>
  );
};

export default BoardFSMState;