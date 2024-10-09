export interface Camera {
  x: number;
  y: number;
  zoom: number;
}

export interface DragState {
  isDragging: boolean;
  isMovingItem: boolean;
  lastMouseX: number;
  lastMouseY: number;
}

export interface MovingItem {
  key: string | null;
  offsetX: number;
  offsetY: number;
}

export interface Product {
  name: string;
  image: string;
}

export interface Category {
  name: string;
  products: Product[];
}

export type Mass = {
  x: number;
  y: number;
  product: Product;
}[];

export interface CategoryMass {
  mass: Mass;
  category: Category;
}

export interface CanvasProps {
  masses: CategoryMass[];
  camera: Camera;
  movingItem: MovingItem;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onWheel: (e: React.WheelEvent<HTMLCanvasElement>) => void;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'system';
}

export interface ChatbotProps {
  isOpen: boolean;
}