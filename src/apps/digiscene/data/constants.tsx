// gridUtils
const GRID_SIZE = 40;
const CATEGORY_SPACING = 2.8;
const ZOOM_MARGIN = 0.9;

// App
const MIN_ZOOM = 1.2;
const MAX_ZOOM = 5;
const ZOOM_SPEED = 0.05;
const ZOOM_THRESHOLD = 0.5;
const INITIAL_CAMERA_X = 0;
const INITIAL_CAMERA_Y = 0;
const INITIAL_CAMERA_ZOOM = 1;
const ANIMATION_DURATION = 1000; // Duration of zoom animation in milliseconds

// drawUtils
const GRID_COLOR = '#ddd';
const MIN_ZOOM_FOR_IMAGES = 2;
const FONT_SIZE_BASE = 16;
const FONT_SIZE_MIN = 12;
const FONT_FAMILY = 'IRANYekan';
const TEXT_PADDING = 10;

export {
  GRID_SIZE,
  MIN_ZOOM,
  MAX_ZOOM,
  ZOOM_SPEED,
  ZOOM_THRESHOLD,
  GRID_COLOR,
  MIN_ZOOM_FOR_IMAGES,
  FONT_SIZE_BASE,
  FONT_SIZE_MIN,
  CATEGORY_SPACING,
  ZOOM_MARGIN,
  FONT_FAMILY,
  INITIAL_CAMERA_X,
  INITIAL_CAMERA_Y,
  INITIAL_CAMERA_ZOOM,
  ANIMATION_DURATION,
  TEXT_PADDING,
}