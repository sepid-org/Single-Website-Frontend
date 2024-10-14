import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { Box, Stack, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';
import BoardPaperWidgets from '../Paper/BoardPaper/BoardPaperWidgets';

const BoardPaperEditor = ({ paperId, backgroundPaperIds = [] }) => {
  const { data: paper } = useGetPaperQuery({ paperId }, { skip: !paperId });
  const [updatePositions] = useUpdatePositionsMutation();
  const [scale, setScale] = useState(0.6);
  const containerRef = useRef(null);

  const widgets = paper?.widgets || [];
  const plateWidth = paper?.position?.width || 1600;
  const plateHeight = paper?.position?.height || 900;

  const handleDragStop = useCallback((id, d) => {
    const updatedWidget = widgets.find(widget => widget.id === id);
    updatePositions({
      paperId,
      positions: [
        {
          ...updatedWidget.position,
          x: Math.round(d.x),
          y: Math.round(d.y),
        }
      ]
    });
  }, [widgets, updatePositions]);

  const handleResize = useCallback((id, ref, position) => {
    const updatedWidget = widgets.find(widget => widget.id === id);
    updatePositions({
      paperId,
      positions: [{
        ...updatedWidget.position,
        width: Math.round(ref.offsetWidth),
        height: Math.round(ref.offsetHeight),
        x: Math.round(position.x),
        y: Math.round(position.y),
      }]
    });
  }, [widgets, updatePositions]);

  const handleZoom = useCallback((delta) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.min(Math.max(newScale, 0.1), 3);
    });
  }, []);

  const handleZoomIn = useCallback(() => handleZoom(0.1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-0.1), [handleZoom]);

  const handleResetView = () => {
    setScale(0.6);
  };

  const handleWheel = useCallback((event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const delta = event.deltaY < 0 ? 0.1 : -0.1;
      handleZoom(delta);
    }
  }, [handleZoom]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === '+' || event.key === '=') {
      handleZoomIn();
    } else if (event.key === '-' || event.key === '_') {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <Stack
      ref={containerRef}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <IconButton onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
        <IconButton onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={handleResetView}>
          <RestartAltIcon />
        </IconButton>
        <CreateWidgetButton paperId={paperId} />
      </Stack>
      <Box
        sx={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          height: plateHeight,
          width: plateWidth,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: plateWidth,
            height: plateHeight,
            background: '#f0f0f0',
          }}
        />
        {backgroundPaperIds.slice().reverse().map(backgroundPaperId =>
          <BoardPaperWidgets key={backgroundPaperId} paperId={backgroundPaperId} mode={WidgetModes.Edit} />
        )}
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
              outline: '1px solid',
              userSelect: 'none',
            }}
            onDragStop={(e, d) => handleDragStop(widget.id, d)}
            onResizeStop={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
            enableUserSelectHack={false}
            scale={scale}
          >
            <Widget coveredWithPaper={false} widget={widget} paperId={paperId} mode={WidgetModes.Edit} />
          </Rnd>
        ))}

      </Box>
    </Stack>
  );
};

export default BoardPaperEditor;