import React, { FC, useCallback, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { Box, Stack } from '@mui/material';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';

type BoardPaperEditorPropsType = {
  paperId: string;
}

const BoardPaperEditor: FC<BoardPaperEditorPropsType> = ({ paperId }) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });
  const [updatePositions] = useUpdatePositionsMutation();

  const widgets = useMemo(() => {
    if (!paper?.widgets) return [];
    return paper.widgets.map(widget => ({
      ...widget,
      position: {
        x: Math.round(Math.random() * 400),
        y: Math.round(Math.random() * 400),
        width: 200,
        height: 200,
        widget: widget.id,
        ...widget.position,
      }
    }));
  }, [paper?.widgets]);

  const handleDragStop = useCallback((id: string, d: { x: number; y: number }) => {
    updatePositions({
      positions: widgets.map(widget =>
        widget.id === id
          ? { ...widget.position, x: Math.round(d.x), y: Math.round(d.y) }
          : widget.position
      ),
    });
  }, [widgets, updatePositions]);

  const handleResize = useCallback((id: string, ref: HTMLElement, position: { x: number; y: number }) => {
    updatePositions({
      positions: widgets.map(widget =>
        widget.id === id
          ? {
            ...widget.position,
            width: Math.round(ref.offsetWidth),
            height: Math.round(ref.offsetHeight),
            x: Math.round(position.x),
            y: Math.round(position.y),
          }
          : widget.position
      ),
    });
  }, [widgets, updatePositions]);

  return (
    <Stack sx={{ overflow: 'hidden', position: 'relative' }}>
      <Stack spacing={1} padding={2} justifyContent={'space-between'} direction={'row'} position={'absolute'} top={0} right={10} zIndex={100}>
        <CreateWidgetButton paperId={paperId} />
      </Stack>
      <Box overflow={'auto'}>
        <div style={{
          width: paper?.position?.width || 1600,
          height: paper?.position?.height || 900,
          background: '#f0f0f0',
          position: 'relative',
        }}>
          {widgets.map((widget) => (
            <Rnd
              key={widget.id}
              default={{
                x: widget.position.x,
                y: widget.position.y,
                width: widget.position.width,
                height: widget.position.height,
              }}
              style={{
                border: 'solid',
                userSelect: 'none',
              }}
              bounds="parent"
              onDragStop={(e, d) => handleDragStop(widget.id, d)}
              onResizeStop={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
              enableUserSelectHack={false}
            >
              <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.Edit} />
            </Rnd>
          ))}
        </div>
      </Box>
    </Stack>
  );
};

export default BoardPaperEditor;