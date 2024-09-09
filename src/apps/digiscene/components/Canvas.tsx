import React, { useRef, useEffect, useCallback } from 'react';
import { drawGrid, drawMasses } from '../utils/drawUtils';
import { CanvasProps } from '../types';

export const Canvas = React.forwardRef<HTMLCanvasElement, CanvasProps>(({
  masses,
  camera,
  movingItem,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, camera);
    drawMasses(ctx, masses, camera, movingItem);
  }, [masses, camera, movingItem]);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      render();
    });

    resizeObserver.observe(canvas);

    const renderLoop = () => {
      render();
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [render]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    onWheel(e as unknown as React.WheelEvent<HTMLCanvasElement>);
  }, [onWheel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <canvas
      ref={(node) => {
        canvasRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ display: 'block' }}
    />
  );
});

Canvas.displayName = 'Canvas';