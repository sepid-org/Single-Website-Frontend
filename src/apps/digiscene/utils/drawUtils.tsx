import { FONT_FAMILY, FONT_SIZE_BASE, FONT_SIZE_MIN, GRID_COLOR, MIN_ZOOM_FOR_IMAGES, TEXT_PADDING } from '../data/constants';
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
  let fontSize = Math.max(FONT_SIZE_MIN, FONT_SIZE_BASE * ctx.canvas.width / 1000);
  ctx.font = `${fontSize}px ${FONT_FAMILY}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const text = categoryMass.category.name;
  const maxWidth = width - 2 * TEXT_PADDING;
  const maxHeight = height - 2 * TEXT_PADDING;

  // Function to wrap text
  const wrapText = (text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  // Wrap text and measure total height
  let lines = wrapText(text, maxWidth);
  let totalHeight = lines.length * fontSize;

  // Scale down font size if text is too big
  while (totalHeight > maxHeight && fontSize > FONT_SIZE_MIN) {
    fontSize--;
    ctx.font = `${fontSize}px ${FONT_FAMILY}`;
    lines = wrapText(text, maxWidth);
    totalHeight = lines.length * fontSize;
  }

  // Draw each line of text
  const startY = top + height / 2 - (totalHeight / 2) + fontSize / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, left + width / 2, startY + i * fontSize);
  });
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