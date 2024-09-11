import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { PositionType, WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetPositionsByPaperQuery, useSavePositionsMutation } from 'apps/website-display/redux/features/object/PositionSlice';
import { Button } from '@mui/material';

const EditableBoardState = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [widgetsWithPositions, setWidgetsWithPositions] = useState<(WidgetType & PositionType)[]>([]);
  const { data: widgetPositions } = useGetPositionsByPaperQuery({ paperId: fsmStateId });
  const [savePositions] = useSavePositionsMutation();

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

  const handleSavePositions = () => {
    savePositions({
      positions: widgetsWithPositions.map(widgetWithPosition => ({
        widget: widgetWithPosition.id,
        x: widgetWithPosition.x,
        y: widgetWithPosition.y,
        width: widgetWithPosition.width,
        height: widgetWithPosition.height,
      }))
    })
  }

  return (
    <div style={{ width: 1600, height: 900, background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
      <Button onClick={handleSavePositions}>
        {'ذخیره'}
      </Button>
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
  );
};

export default EditableBoardState;