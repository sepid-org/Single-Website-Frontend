import { Camera, CategoryMass, Category, Mass, Product } from '../types';

export const GRID_SIZE = 40;
export const CATEGORY_SPACING = 3; // Minimum number of grid cells between categories

export const createMasses = (categories: Category[]): CategoryMass[] => {
  const masses: CategoryMass[] = [];
  const usedPositions = new Set<string>();

  categories.forEach((category, index) => {
    const categoryCenter = findCategoryCenter(index, categories.length);
    const mass: Mass = createConnectedMass(category.products, categoryCenter, usedPositions);
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
    let x: number, y: number;
    if (index === 0) {
      x = center.x;
      y = center.y;
    } else {
      const availablePositions = [];
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

      if (availablePositions.length === 0) {
        throw new Error("No available positions for product placement");
      }

      const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      x = randomPosition.x;
      y = randomPosition.y;
    }

    mass.push({ x, y, product });
    usedPositions.add(`${x},${y}`);
  });

  return mass;
};

export const centerCameraOnAllMasses = (masses: CategoryMass[], width: number, height: number): Camera => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  masses.forEach(categoryMass => {
    categoryMass.mass.forEach(item => {
      minX = Math.min(minX, item.x);
      maxX = Math.max(maxX, item.x);
      minY = Math.min(minY, item.y);
      maxY = Math.max(maxY, item.y);
    });
  });
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const gridWidth = (maxX - minX + 1) * GRID_SIZE;
  const gridHeight = (maxY - minY + 1) * GRID_SIZE;
  const scaleX = width / gridWidth;
  const scaleY = height / gridHeight;
  const zoom = Math.min(scaleX, scaleY) * 0.9;
  return {
    x: centerX * GRID_SIZE - width / (2 * zoom),
    y: centerY * GRID_SIZE - height / (2 * zoom),
    zoom
  };
};

export const isPointInMass = (x: number, y: number, mass: Mass): boolean => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  mass.forEach(item => {
    minX = Math.min(minX, item.x);
    maxX = Math.max(maxX, item.x);
    minY = Math.min(minY, item.y);
    maxY = Math.max(maxY, item.y);
  });
  return x >= minX * GRID_SIZE && x <= (maxX + 1) * GRID_SIZE &&
    y >= minY * GRID_SIZE && y <= (maxY + 1) * GRID_SIZE;
};

export const zoomToMass = (mass: Mass, width: number, height: number): Camera => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  mass.forEach(item => {
    minX = Math.min(minX, item.x);
    maxX = Math.max(maxX, item.x);
    minY = Math.min(minY, item.y);
    maxY = Math.max(maxY, item.y);
  });
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const massWidth = (maxX - minX + 1) * GRID_SIZE;
  const massHeight = (maxY - minY + 1) * GRID_SIZE;
  const scaleX = width / massWidth;
  const scaleY = height / massHeight;
  const zoom = Math.min(scaleX, scaleY) * 0.9;
  return {
    x: centerX * GRID_SIZE - width / (2 * zoom),
    y: centerY * GRID_SIZE - height / (2 * zoom),
    zoom
  };
};