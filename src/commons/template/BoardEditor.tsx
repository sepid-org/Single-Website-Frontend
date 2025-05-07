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
import Layer from './Board/Layer';

const BoardEditor = ({ activePaperId, backgroundPaperIds = [] }) => {
  const { data: paper } = useGetPaperQuery(
    { paperId: activePaperId },
    {
      skip: !activePaperId,
      selectFromResult: (result) => ({
        ...result,
        data: activePaperId ? result.data : null,
      }),
    }
  );
  const [updatePositions] = useUpdatePositionsMutation();

  const [scale, setScale] = useState(0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  const widgets = paper?.widgets || [];
  const plateWidth = paper?.position?.width || 1600;
  const plateHeight = paper?.position?.height || 900;

  const handleDragStop = useCallback((id, d) => {
    const updatedWidget = widgets.find(widget => widget.id === id);
    updatePositions({
      paperId: activePaperId,
      positions: [
        {
          ...updatedWidget.position,
          x: Math.round(d.x),
          y: Math.round(d.y),
        },
      ],
    });
  }, [widgets, updatePositions, activePaperId]);

  const handleResize = useCallback((id, ref, position) => {
    const updatedWidget = widgets.find(widget => widget.id === id);
    updatePositions({
      paperId: activePaperId,
      positions: [
        {
          ...updatedWidget.position,
          width: Math.round(ref.offsetWidth),
          height: Math.round(ref.offsetHeight),
          x: Math.round(position.x),
          y: Math.round(position.y),
        },
      ],
    });
  }, [widgets, updatePositions, activePaperId]);

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
    setPan({ x: 0, y: 0 });
  };

  const handleWheel = useCallback((event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const delta = event.deltaY < 0 ? 0.1 : -0.1;
      handleZoom(delta);
    } else {
      // برای جابجایی صفحه با موس
      setPan((prevPan) => ({
        x: prevPan.x + event.deltaX,
        y: prevPan.y - event.deltaY,
      }));
    }
  }, [handleZoom]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === '+' || event.key === '=') {
      handleZoomIn();
    } else if (event.key === '-' || event.key === '_') {
      handleZoomOut();
    }

    // برای جابجایی صفحه با کیبورد
    const panSpeed = 10; // سرعت جابجایی
    switch (event.key) {
      case 'ArrowUp':
        setPan((prevPan) => ({ ...prevPan, y: prevPan.y + panSpeed }));
        break;
      case 'ArrowDown':
        setPan((prevPan) => ({ ...prevPan, y: prevPan.y - panSpeed }));
        break;
      case 'ArrowLeft':
        setPan((prevPan) => ({ ...prevPan, x: prevPan.x - panSpeed }));
        break;
      case 'ArrowRight':
        setPan((prevPan) => ({ ...prevPan, x: prevPan.x + panSpeed }));
        break;
      default:
        break;
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
      position="relative"
      height="100%"
      width="100%"
      sx={{
        overflow: 'hidden',
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
        <CreateWidgetButton paperId={activePaperId} />
      </Stack>
      <Box
        sx={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease',
          backgroundColor: 'orange',
          height: plateHeight,
          width: plateWidth,
        }}
      >
        <Box
          sx={{
            width: plateWidth,
            height: plateHeight,
            background: '#f0f0f0',
          }}
        />
        {backgroundPaperIds.map(backgroundPaperId =>
          <Layer
            key={backgroundPaperId}
            paperId={backgroundPaperId}
            widgetsMode={WidgetModes.Disable}
          />
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
              outline: '2px solid',
              userSelect: 'none',
            }}
            onDragStop={(e, d) => handleDragStop(widget.id, d)}
            onResizeStop={(e, direction, ref, delta, position) => handleResize(widget.id, ref, position)}
            enableUserSelectHack={false}
            scale={scale}
            dragGrid={[5, 5]}
            resizeGrid={[5, 5]}
          >
            <Widget
              coveredWithPaper={false}
              widget={widget}
              paperId={activePaperId}
              mode={WidgetModes.Edit}
            />
          </Rnd>
        ))}
      </Box>
    </Stack>
  );
};

export default BoardEditor;