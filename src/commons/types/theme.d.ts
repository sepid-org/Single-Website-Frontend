import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: string;
  }
  interface PaletteOptions {
    accent?: string;
  }
}