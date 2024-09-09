import { FONT_FAMILY, FONT_SIZE_BASE, FONT_SIZE_MIN, GRID_COLOR, MIN_ZOOM_FOR_IMAGES } from '../data/constants';
import { Camera, MovingItem, CategoryMass, Mass } from '../types';
import { GRID_SIZE } from './gridUtils';

const drawGrid = (ctx: CanvasRenderingContext2D, camera: Camera): void => {
  const { width, height } = ctx.canvas;
  const { x: cameraX, y: cameraY, zoom } = camera;

  const startX = Math.floor(cameraX / GRID_SIZE) * GRID_SIZE - cameraX % GRID_SIZE;
  const startY = Math.floor(cameraY / GRID_SIZE) * GRID_SIZE - cameraY % GRID_SIZE;
  const endX = startX + width / zoom + GRID_SIZE;
  const endY = startY + height / zoom + GRID_SIZE;

  ctx.strokeStyle = GRID_COLOR;
  ctx.beginPath();

  for (let x = startX; x <= endX; x += GRID_SIZE) {
    const screenX = (x - cameraX) * zoom;
    ctx.moveTo(screenX, 0);
    ctx.lineTo(screenX, height);
  }

  for (let y = startY; y <= endY; y += GRID_SIZE) {
    const screenY = (y - cameraY) * zoom;
    ctx.moveTo(0, screenY);
    ctx.lineTo(width, screenY);
  }

  ctx.stroke();
};

const getBoundingBox = (mass: Mass) => {
  return mass.reduce((box, item) => ({
    minX: Math.min(box.minX, item.x),
    maxX: Math.max(box.maxX, item.x),
    minY: Math.min(box.minY, item.y),
    maxY: Math.max(box.maxY, item.y),
  }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
};

const drawBox = (
  ctx: CanvasRenderingContext2D,
  categoryMass: CategoryMass,
  index: number,
  left: number,
  top: number,
  width: number,
  height: number
): void => {
  ctx.fillStyle = `hsl(${index * 60}, 70%, 60%)`;
  ctx.fillRect(left, top, width, height);

  ctx.fillStyle = 'black';
  const fontSize = Math.max(FONT_SIZE_MIN, FONT_SIZE_BASE * ctx.canvas.width / 1000);
  ctx.font = `${fontSize}px ${FONT_FAMILY}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryMass.category.name, left + width / 2, top + height / 2);
};

const drawImage = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  imageSrc: string,
  alpha: number = 1
) => {
  const img = new Image();
  img.src = imageSrc;
  ctx.globalAlpha = alpha;
  ctx.drawImage(img, x, y, size, size);
  ctx.globalAlpha = 1;
};

const drawMasses = (
  ctx: CanvasRenderingContext2D,
  masses: CategoryMass[],
  camera: Camera,
  movingItem: MovingItem
): void => {
  const { width, height } = ctx.canvas;
  const { x: cameraX, y: cameraY, zoom } = camera;

  masses.forEach((categoryMass, index) => {
    const { minX, minY, maxX, maxY } = getBoundingBox(categoryMass.mass);
    const left = (minX * GRID_SIZE - cameraX) * zoom;
    const top = (minY * GRID_SIZE - cameraY) * zoom;
    const right = ((maxX + 1) * GRID_SIZE - cameraX) * zoom;
    const bottom = ((maxY + 1) * GRID_SIZE - cameraY) * zoom;

    if (right < 0 || left > width || bottom < 0 || top > height) {
      return; // Skip drawing if the mass is not visible
    }

    if (zoom < MIN_ZOOM_FOR_IMAGES) {
      drawBox(ctx, categoryMass, index, left, top, right - left, bottom - top);
    } else {
      categoryMass.mass.forEach(item => {
        const x = (item.x * GRID_SIZE - cameraX) * zoom;
        const y = (item.y * GRID_SIZE - cameraY) * zoom;
        const size = GRID_SIZE * zoom;

        if (x < -size || y < -size || x > width || y > height) {
          return; // Skip drawing if the item is not visible
        }

        const key = `${item.x},${item.y}`;
        if (key !== movingItem.key) {
          drawImage(ctx, x, y, size, item.product.image);
        }
      });

      if (movingItem.key) {
        const [x, y] = movingItem.key.split(',').map(Number);
        const movingProduct = categoryMass.mass.find(item => item.x === x && item.y === y);
        if (movingProduct) {
          drawImage(
            ctx,
            (x * GRID_SIZE - cameraX + movingItem.offsetX) * zoom,
            (y * GRID_SIZE - cameraY + movingItem.offsetY) * zoom,
            GRID_SIZE * zoom,
            movingProduct.product.image,
            0.6
          );
        }
      }
    }
  });
};

export { drawGrid, drawMasses };