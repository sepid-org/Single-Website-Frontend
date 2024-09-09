import { CATEGORY_SPACING, GRID_SIZE, ZOOM_MARGIN } from '../data/constants';
import { Camera, CategoryMass, Category, Mass, Product } from '../types';

const createMasses = (categories: Category[]): CategoryMass[] => {
  const masses: CategoryMass[] = [];
  const usedPositions = new Set<string>();

  categories.forEach((category, index) => {
    const categoryCenter = findCategoryCenter(index, categories.length);
    const mass = createConnectedMass(category.products, categoryCenter, usedPositions);
    masses.push({ category, mass });
  });

  return masses;
};

const findCategoryCenter = (index: number, totalCategories: number): { x: number, y: number } => {
  const angle = (index / totalCategories) * 2 * Math.PI;
  const radius = totalCategories * CATEGORY_SPACING / 2;
  return {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius)
  };
};

const createConnectedMass = (products: Product[], center: { x: number, y: number }, usedPositions: Set<string>): Mass => {
  const mass: Mass = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  products.forEach((product, index) => {
    let position: { x: number, y: number };
    if (index === 0) {
      position = center;
    } else {
      const availablePositions = getAvailablePositions(mass, usedPositions, directions);
      if (availablePositions.length === 0) {
        throw new Error("No available positions for product placement");
      }
      position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    }

    mass.push({ ...position, product });
    usedPositions.add(`${position.x},${position.y}`);
  });

  return mass;
};

const getAvailablePositions = (mass: Mass, usedPositions: Set<string>, directions: number[][]): { x: number, y: number }[] => {
  const availablePositions: { x: number, y: number }[] = [];
  mass.forEach(item => {
    directions.forEach(([dx, dy]) => {
      const newX = item.x + dx;
      const newY = item.y + dy;
      const key = `${newX},${newY}`;
      if (!usedPositions.has(key)) {
        availablePositions.push({ x: newX, y: newY });
      }
    });
  });
  return availablePositions;
};

const getBoundingBox = (masses: CategoryMass[]): { minX: number, maxX: number, minY: number, maxY: number } => {
  return masses.reduce((box, categoryMass) => {
    categoryMass.mass.forEach(item => {
      box.minX = Math.min(box.minX, item.x);
      box.maxX = Math.max(box.maxX, item.x);
      box.minY = Math.min(box.minY, item.y);
      box.maxY = Math.max(box.maxY, item.y);
    });
    return box;
  }, { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
};

const centerCameraOnAllMasses = (masses: CategoryMass[], width: number, height: number): Camera => {
  const { minX, maxX, minY, maxY } = getBoundingBox(masses);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const gridWidth = (maxX - minX + 1) * GRID_SIZE;
  const gridHeight = (maxY - minY + 1) * GRID_SIZE;
  const scaleX = width / gridWidth;
  const scaleY = height / gridHeight;
  const zoom = Math.min(scaleX, scaleY) * ZOOM_MARGIN;
  return {
    x: centerX * GRID_SIZE - width / (2 * zoom),
    y: centerY * GRID_SIZE - height / (2 * zoom),
    zoom
  };
};

const isPointInMass = (x: number, y: number, mass: Mass): boolean => {
  const { minX, maxX, minY, maxY } = getBoundingBox([{ category: { name: '', products: [] }, mass }]);
  return x >= minX * GRID_SIZE && x <= (maxX + 1) * GRID_SIZE &&
    y >= minY * GRID_SIZE && y <= (maxY + 1) * GRID_SIZE;
};

const zoomToMass = (mass: Mass, width: number, height: number): Camera => {
  const { minX, maxX, minY, maxY } = getBoundingBox([{ category: { name: '', products: [] }, mass }]);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const massWidth = (maxX - minX + 1) * GRID_SIZE;
  const massHeight = (maxY - minY + 1) * GRID_SIZE;
  const scaleX = width / massWidth;
  const scaleY = height / massHeight;
  const zoom = Math.min(scaleX, scaleY) * ZOOM_MARGIN;
  return {
    x: centerX * GRID_SIZE - width / (2 * zoom),
    y: centerY * GRID_SIZE - height / (2 * zoom),
    zoom
  };
};

export { createMasses, centerCameraOnAllMasses, isPointInMass, zoomToMass, GRID_SIZE };