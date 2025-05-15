import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import CreateWidgetButton from 'commons/components/molecules/CreateWidgetButton';
import { useUpdatePositionsMutation } from 'apps/website-display/redux/features/object/ObjectSlice';
import { Box, Stack, IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Layer from './Board/Layer';
import usePaper from 'apps/fsm/hooks/usePaper';

const BoardEditor = ({ activePaperId, allPaperIds = [] }) => {
  // Fetch paper data with widget positions
  const { paper } = usePaper(activePaperId);

  // Mutation hook to persist position updates
  const [updatePositions] = useUpdatePositionsMutation();

  // Zoom level and pan offsets
  const [scale, setScale] = useState(0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Canvas dimensions from active paper
  const plateWidth = paper?.position?.width || 1600;
  const plateHeight = paper?.position?.height || 900;

  // Split backgroundPaperIds into before/after around activePaperId
  const activeIndex = allPaperIds.indexOf(activePaperId);
  const beforeActive = allPaperIds.slice(0, activeIndex);
  const afterActive = allPaperIds.slice(activeIndex + 1);

  // Handler for drag stop to update widget position
  const handleDragStop = useCallback(
    (id, d) => {
      const widget = paper.widgets.find((w) => w.id === id);
      updatePositions({
        paperId: activePaperId,
        positions: [{ ...widget.position, x: Math.round(d.x), y: Math.round(d.y) }],
      });
    },
    [paper, updatePositions, activePaperId]
  );

  // Handler for resize stop to update widget size and position
  const handleResizeStop = useCallback(
    (id, ref, position) => {
      const widget = paper.widgets.find((w) => w.id === id);
      updatePositions({
        paperId: activePaperId,
        positions: [
          {
            ...widget.position,
            width: Math.round(ref.offsetWidth),
            height: Math.round(ref.offsetHeight),
            x: Math.round(position.x),
            y: Math.round(position.y),
          },
        ],
      });
    },
    [paper, updatePositions, activePaperId]
  );

  // Zoom controls
  const handleZoom = useCallback((delta) => setScale((s) => Math.min(Math.max(s + delta, 0.1), 3)), []);
  const handleZoomIn = useCallback(() => handleZoom(0.1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-0.1), [handleZoom]);
  const handleResetView = () => {
    setScale(0.6);
    setPan({ x: 0, y: 0 });
  };

  // Mouse wheel for pan & zoom
  const handleWheel = useCallback(
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        handleZoom(e.deltaY < 0 ? 0.1 : -0.1);
      } else {
        setPan((p) => ({ x: p.x + e.deltaX, y: p.y - e.deltaY }));
      }
    },
    [handleZoom]
  );

  // Keyboard shortcuts for zoom & pan
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      const speed = 10;
      switch (e.key) {
        case 'ArrowUp':
          setPan((p) => ({ ...p, y: p.y + speed }));
          break;
        case 'ArrowDown':
          setPan((p) => ({ ...p, y: p.y - speed }));
          break;
        case 'ArrowLeft':
          setPan((p) => ({ ...p, x: p.x - speed }));
          break;
        case 'ArrowRight':
          setPan((p) => ({ ...p, x: p.x + speed }));
          break;
        default:
          break;
      }
    },
    [handleZoomIn, handleZoomOut]
  );

  // Attach event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el && el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <Stack
      ref={containerRef}
      position="relative"
      width="100%"
      height="100%"
      sx={{ overflow: 'hidden' }}
      alignItems="center"
      justifyContent="center"
    >
      {/* Toolbar: zoom controls & create button */}
      <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <IconButton onClick={handleZoomIn}><ZoomInIcon /></IconButton>
        <IconButton onClick={handleZoomOut}><ZoomOutIcon /></IconButton>
        <IconButton onClick={handleResetView}><RestartAltIcon /></IconButton>
        <CreateWidgetButton paperId={activePaperId} />
      </Stack>

      {/* Main drawing surface with pan & zoom transform */}
      <Box
        sx={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease',
          width: plateWidth,
          height: plateHeight,
          backgroundColor: 'orange',
        }}
      >
        {/* Base background layer */}
        <Box sx={{ width: plateWidth, height: plateHeight, background: '#f0f0f0' }} />

        {/* Render layers before the active one in disabled mode */}
        {beforeActive.map((pid) => (
          <Layer key={pid} paperId={pid} widgetsMode={WidgetModes.Disable} />
        ))}

        {/* Render active layer widgets manually so they remain editable */}
        {paper?.widgets.map((widget) => (
          <Rnd
            key={widget.id}
            default={{ x: widget.position.x, y: widget.position.y, width: widget.position.width, height: widget.position.height }}
            style={{ outline: '2px solid', userSelect: 'none' }}
            onDragStop={(e, d) => handleDragStop(widget.id, d)}
            onResizeStop={(e, dir, ref, delta, pos) => handleResizeStop(widget.id, ref, pos)}
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

        {/* Render layers after the active one in disabled mode */}
        {afterActive.map((pid) => (
          <Layer key={pid} paperId={pid} widgetsMode={WidgetModes.Disable} />
        ))}
      </Box>
    </Stack>
  );
};

export default BoardEditor;