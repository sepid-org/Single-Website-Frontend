import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, camera);
      drawMasses(ctx, masses, camera, movingItem);
      requestAnimationFrame(render);
    };
    render();

    // Add non-passive wheel event listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      onWheel(e as unknown as React.WheelEvent<HTMLCanvasElement>);
    };
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup function
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [masses, camera, movingItem, onWheel]);

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