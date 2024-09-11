import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useGetFSMStateQuery, useUpdateFSMStateMutation } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { PositionType, WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetPositionsByPaperQuery, useSavePositionsMutation } from 'apps/website-display/redux/features/object/PositionSlice';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';
import { FSMStateType } from 'commons/types/models';
import { toast } from 'react-toastify';

const EditableBoardState = ({ fsmStateId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: initialFsmState } = useGetFSMStateQuery({ fsmStateId });
  const [fsmState, setFsmState] = useState<FSMStateType>(null);
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [widgetsWithPositions, setWidgetsWithPositions] = useState<(WidgetType & PositionType)[]>([]);
  const { data: widgetPositions } = useGetPositionsByPaperQuery({ paperId: fsmStateId });
  const [updateFSMState, { isSuccess: isUpdateFSMStateSuccess, isError: isUpdateFSMStateError }] = useUpdateFSMStateMutation();
  const [savePositions, { isSuccess: isSavePositionsSuccess, isError: isSavePositionsError }] = useSavePositionsMutation();

  useEffect(() => {
    if (initialFsmState) {
      setFsmState(initialFsmState);
    }
  }, [initialFsmState]);

  useEffect(() => {
    if (!paper || !widgetPositions) return;
    const widgets = paper.widgets;
    const mergeWidgetsAndPositions = () => {
      return widgets.map(widget => {
        const position = widgetPositions.find(pos => pos.widget === widget.id) || {
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
    };

    const merged = mergeWidgetsAndPositions();
    setWidgetsWithPositions(merged);
  }, [paper, widgetPositions]);

  const handleDragStop = (id, d) => {
    setWidgetsWithPositions(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id ? { ...comp, x: Math.round(d.x), y: Math.round(d.y) } : comp
      )
    );
  };

  const handleResize = (id, ref, position) => {
    setWidgetsWithPositions(prevComponents =>
      prevComponents.map(comp =>
        comp.id === id
          ? { ...comp, width: Math.round(ref.offsetWidth), height: Math.round(ref.offsetHeight), x: Math.round(position.x), y: Math.round(position.y) }
          : comp
      )
    );
  };

  const handleUpdateFSMState = () => {
    savePositions({
      positions: widgetsWithPositions.map(widgetWithPosition => ({
        widget: widgetWithPosition.id,
        x: widgetWithPosition.x,
        y: widgetWithPosition.y,
        width: widgetWithPosition.width,
        height: widgetWithPosition.height,
      }))
    })
    updateFSMState({
      fsmStateId,
      ...fsmState,
    })
  }

  useEffect(() => {
    if (isUpdateFSMStateSuccess && isSavePositionsSuccess) {
      toast.success('تغییرات با موفقیت ثبت شدند.');
    }
  }, [isUpdateFSMStateSuccess, isSavePositionsSuccess])

  useEffect(() => {
    if (isSavePositionsError && isUpdateFSMStateError) {
      toast.error('مشکلی در ثبت تغییرات وجود داشت.');
    }
  }, [isUpdateFSMStateSuccess, isSavePositionsSuccess])

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
    <Stack sx={{ overflow: 'hidden', }}>
      <Stack padding={1} justifyContent={'space-between'} direction={'row'}>
        <Stack direction={'row'} spacing={1}>
          <CreateWidgetButton paperId={fsmStateId} />
          <Divider orientation='vertical' />
          <FormControlLabel
            labelPlacement='start'
            label={'نمایش نوار ابزار بالای صفحه:'}
            control={
              <Checkbox
                checked={fsmState?.show_appbar || false}
                onChange={() => {
                  setFsmState({
                    ...fsmState,
                    show_appbar: !fsmState.show_appbar,
                  })
                }}
                color="primary"
              />
            } />
          <Divider orientation='vertical' />
        </Stack>
        <Button variant='contained' onClick={handleUpdateFSMState}>
          {'ذخیره'}
        </Button>
      </Stack>
      <Box sx={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }}>
        <div style={{ width: 1600, height: 900, background: '#f0f0f0' }}>
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
              onResize={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
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

export default EditableBoardState;