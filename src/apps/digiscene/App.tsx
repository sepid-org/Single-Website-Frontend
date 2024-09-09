import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from './components/Canvas';
import { createMasses, centerCameraOnAllMasses, isPointInMass, zoomToMass } from './utils/gridUtils';
import { Camera, DragState, MovingItem, CategoryMass } from './types';
import { categories } from './data/categories';

const App: React.FC = () => {
  const [masses, setMasses] = useState<CategoryMass[]>([]);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [dragState, setDragState] = useState<DragState>({ isDragging: false, isMovingItem: false, lastMouseX: 0, lastMouseY: 0 });
  const [movingItem, setMovingItem] = useState<MovingItem>({ key: null, offsetX: 0, offsetY: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const newMasses = createMasses(categories);
    setMasses(newMasses);
    const newCamera = centerCameraOnAllMasses(newMasses, window.innerWidth, window.innerHeight);
    setCamera(newCamera);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { zoom, x: cameraX, y: cameraY } = camera;
    if (zoom < 0.5) {
      const mouseX = e.clientX / zoom + cameraX;
      const mouseY = e.clientY / zoom + cameraY;
      const clickedMass = masses.find(categoryMass => isPointInMass(mouseX, mouseY, categoryMass.mass));
      if (clickedMass) {
        const newCamera = zoomToMass(clickedMass.mass, window.innerWidth, window.innerHeight);
        setCamera(newCamera);
      }
    } else {
      const gridX = Math.floor((e.clientX / zoom + cameraX) / 40);
      const gridY = Math.floor((e.clientY / zoom + cameraY) / 40);
      const key = `${gridX},${gridY}`;
      const clickedItem = masses.some(categoryMass =>
        categoryMass.mass.some(item => item.x === gridX && item.y === gridY)
      );
      if (clickedItem) {
        setDragState(prev => ({ ...prev, isMovingItem: true }));
        setMovingItem({
          key,
          offsetX: (e.clientX / zoom + cameraX) % 40,
          offsetY: (e.clientY / zoom + cameraY) % 40
        });
      } else {
        setDragState(prev => ({ ...prev, isDragging: true }));
      }
    }
    setDragState(prev => ({ ...prev, lastMouseX: e.clientX, lastMouseY: e.clientY }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { isDragging, isMovingItem, lastMouseX, lastMouseY } = dragState;
    if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      setCamera(prev => ({ ...prev, x: prev.x - dx / prev.zoom, y: prev.y - dy / prev.zoom }));
    } else if (isMovingItem) {
      setMovingItem(prev => ({
        ...prev,
        offsetX: prev.offsetX + (e.clientX - lastMouseX) / camera.zoom,
        offsetY: prev.offsetY + (e.clientY - lastMouseY) / camera.zoom
      }));
    }
    setDragState(prev => ({ ...prev, lastMouseX: e.clientX, lastMouseY: e.clientY }));
  };

  const handleMouseUp = () => {
    if (dragState.isMovingItem && movingItem.key) {
      const [oldX, oldY] = movingItem.key.split(',').map(Number);
      const newX = Math.floor((oldX * 40 + movingItem.offsetX) / 40);
      const newY = Math.floor((oldY * 40 + movingItem.offsetY) / 40);
      const newKey = `${newX},${newY}`;

      if (newKey !== movingItem.key) {
        setMasses(prevMasses => prevMasses.map(categoryMass => ({
          ...categoryMass,
          mass: categoryMass.mass.map(item =>
            (item.x === oldX && item.y === oldY)
              ? { ...item, x: newX, y: newY }
              : item
          )
        })));
      }
    }
    setDragState(prev => ({ ...prev, isDragging: false, isMovingItem: false }));
    setMovingItem({ key: null, offsetX: 0, offsetY: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    // Removed e.preventDefault();
    const zoomSpeed = 0.1;
    const zoomPoint = {
      x: e.clientX / camera.zoom + camera.x,
      y: e.clientY / camera.zoom + camera.y
    };

    let newZoom = e.deltaY < 0 ? camera.zoom * (1 + zoomSpeed) : camera.zoom / (1 + zoomSpeed);
    newZoom = Math.max(0.1, Math.min(newZoom, 2));

    setCamera(prev => ({
      zoom: newZoom,
      x: zoomPoint.x - e.clientX / newZoom,
      y: zoomPoint.y - e.clientY / newZoom
    }));
  };

  return (
    <Canvas
      ref={canvasRef}
      masses={masses}
      camera={camera}
      movingItem={movingItem}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    />
  );
};

export default App;