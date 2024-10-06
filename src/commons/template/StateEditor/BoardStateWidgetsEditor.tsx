import React, { FC, useEffect, useMemo, useState } from 'react';
import { Rnd } from 'react-rnd';
import { PositionType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';
import { toast } from 'react-toastify';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';

type BoardStateWidgetsEditorPropsType = {
  fsmStateId: string;
}

const BoardStateWidgetsEditor: FC<BoardStateWidgetsEditorPropsType> = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [positions, setPositions] = useState<PositionType[]>(null);
  const [updatePositions, { isSuccess: isUpdatePositionsSuccess }] = useUpdatePositionsMutation();
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

  useEffect(() => {
    const widgets = paper?.widgets;
    if (widgets) {
      // Check if any widget has no position, and if so, assign a random one
      const updatedPositions = widgets.map((widget) => {
        const widgetPosition = widget.position;

        if (widgetPosition) {
          return widgetPosition;
        } else {
          // Add a random position if no position found for this widget
          return {
            x: Math.round(Math.random() * 400),
            y: Math.round(Math.random() * 400),
            width: 200,
            height: 200,
            widget: widget.id,
          };
        }
      });

      setPositions(updatedPositions);
    }
  }, [paper]);

  const handleDragStop = (id, d) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.widget === id ? { ...position, x: Math.round(d.x), y: Math.round(d.y) } : position
      )
    );
  };

  const handleResize = (id, ref, position) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.widget === id
          ? {
            ...position,
            width: Math.round(ref.offsetWidth),
            height: Math.round(ref.offsetHeight),
            x: Math.round(position.x),
            y: Math.round(position.y),
          }
          : position
      )
    );
  };

  const handleUpdateFSMState = () => {
    updatePositions({
      positions,
    })
  }

  useEffect(() => {
    if (isUpdatePositionsSuccess) {
      toast.success('تغییرات با موفقیت ثبت شدند.');
    }
  }, [isUpdatePositionsSuccess])

  const widgetsWithPositions = useMemo(() => {
    if (!paper || !positions) return [];
    const widgets = [...paper.widgets].sort((w1, w2) => (parseInt(w1.order) - parseInt(w2.order)));
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
  }, [paper, positions]);

  if (isMobile) {
    return (
      <Paper sx={{ padding: 2 }}>
        <Typography textAlign={'center'}>
          {'ویرایش این گام در تلفن همراه امکان‌پذیر نیست :('}
        </Typography>
      </Paper>
    )
  }

  return (
    <Stack sx={{ overflow: 'hidden', userSelect: 'none' }}>
      <Stack padding={1} justifyContent={'space-between'} direction={'row'}>
        <CreateWidgetButton paperId={fsmStateId} />
        <Button variant='contained' onClick={handleUpdateFSMState}>
          {'ذخیره'}
        </Button>
      </Stack>
      <Box sx={{ overflow: 'auto' }}>
        <div style={{
          width: fsmState.position?.width || 1600,
          height: fsmState.position?.height || 900,
          background: '#f0f0f0',
          position: 'relative',
        }}>
          {widgetsWithPositions?.map((widget) => (
            <Rnd
              key={widget.id}
              default={{
                x: widget.x,
                y: widget.y,
                width: widget.width,
                height: widget.height,
              }}
              style={{ border: 'solid' }}
              bounds="parent"
              onDragStop={(e, d) => handleDragStop(widget.id, d)}
              onResizeStop={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
              enableUserSelectHack={false}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Widget coveredWithPaper={false} widget={widget} paperId={fsmStateId} mode={WidgetModes.Edit} />
              </div>
            </Rnd>
          ))}
        </div>
      </Box>
    </Stack >
  );
};

export default BoardStateWidgetsEditor;