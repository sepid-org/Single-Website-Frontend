import { Camera, MovingItem, CategoryMass, Mass } from '../types';

const GRID_SIZE = 40;

export const drawGrid = (ctx: CanvasRenderingContext2D, camera: Camera): void => {
  const { width, height } = ctx.canvas;
  const startX = Math.floor(camera.x / GRID_SIZE) * GRID_SIZE - camera.x % GRID_SIZE;
  const startY = Math.floor(camera.y / GRID_SIZE) * GRID_SIZE - camera.y % GRID_SIZE;
  const endX = startX + width / camera.zoom + GRID_SIZE;
  const endY = startY + height / camera.zoom + GRID_SIZE;

  ctx.strokeStyle = '#ddd';
  ctx.beginPath();
  for (let x = startX; x <= endX; x += GRID_SIZE) {
    ctx.moveTo((x - camera.x) * camera.zoom, 0);
    ctx.lineTo((x - camera.x) * camera.zoom, height);
  }
  for (let y = startY; y <= endY; y += GRID_SIZE) {
    ctx.moveTo(0, (y - camera.y) * camera.zoom);
    ctx.lineTo(width, (y - camera.y) * camera.zoom);
  }
  ctx.stroke();
};

export const drawMasses = (
  ctx: CanvasRenderingContext2D,
  masses: CategoryMass[],
  camera: Camera,
  movingItem: MovingItem
): void => {
  const { width, height } = ctx.canvas;
  masses.forEach((categoryMass, index) => {
    const { minX, minY, maxX, maxY } = getBoundingBox(categoryMass.mass);
    const left = (minX * GRID_SIZE - camera.x) * camera.zoom;
    const top = (minY * GRID_SIZE - camera.y) * camera.zoom;
    const right = ((maxX + 1) * GRID_SIZE - camera.x) * camera.zoom;
    const bottom = ((maxY + 1) * GRID_SIZE - camera.y) * camera.zoom;

    if (right < 0 || left > width || bottom < 0 || top > height) {
      return; // Skip drawing if the mass is not visible
    }

    if (camera.zoom < 0.5) {
      drawBox(ctx, categoryMass, index, left, top, right - left, bottom - top);
    } else {
      drawImages(ctx, categoryMass.mass, camera, movingItem);
    }
  });
};

const getBoundingBox = (mass: Mass) => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  mass.forEach(item => {
    minX = Math.min(minX, item.x);
    maxX = Math.max(maxX, item.x);
    minY = Math.min(minY, item.y);
    maxY = Math.max(maxY, item.y);
  });
  return { minX, minY, maxX, maxY };
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

  // Draw category name
  ctx.fillStyle = 'black';
  ctx.font = `${Math.max(12, 20 * ctx.canvas.width / 1000)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(categoryMass.category.name, left + width / 2, top + height / 2);
};

const drawImages = (
  ctx: CanvasRenderingContext2D,
  mass: Mass,
  camera: Camera,
  movingItem: MovingItem
): void => {
  mass.forEach(item => {
    const x = (item.x * GRID_SIZE - camera.x) * camera.zoom;
    const y = (item.y * GRID_SIZE - camera.y) * camera.zoom;
    const size = GRID_SIZE * camera.zoom;

    if (x < -size || y < -size || x > ctx.canvas.width || y > ctx.canvas.height) {
      return; // Skip drawing if the item is not visible
    }

    const key = `${item.x},${item.y}`;
    if (key !== movingItem.key) {
      const img = new Image();
      img.src = item.product.image;
      ctx.drawImage(img, x, y, size, size);
    }
  });

  if (movingItem.key) {
    const [x, y] = movingItem.key.split(',').map(Number);
    const movingProduct = mass.find(item => item.x === x && item.y === y);
    if (movingProduct) {
      const img = new Image();
      img.src = movingProduct.product.image;
      ctx.globalAlpha = 0.6;
      ctx.drawImage(img,
        (x * GRID_SIZE - camera.x + movingItem.offsetX) * camera.zoom,
        (y * GRID_SIZE - camera.y + movingItem.offsetY) * camera.zoom,
        GRID_SIZE * camera.zoom,
        GRID_SIZE * camera.zoom);
      ctx.globalAlpha = 1;
    }
  }
};