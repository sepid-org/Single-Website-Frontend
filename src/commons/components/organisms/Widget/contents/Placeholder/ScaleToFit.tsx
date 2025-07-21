import React, { ReactNode, useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';

type ScaleToFitProps = { children: ReactNode };

export default function ScaleToFit({ children }: ScaleToFitProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!parentRef.current || !childRef.current) return;

    const resize = () => {
      const pw = parentRef.current!.offsetWidth;
      const ph = parentRef.current!.offsetHeight;

      const cw = childRef.current!.offsetWidth;
      const ch = childRef.current!.offsetHeight;

      if (!cw || !ch) return;

      const scale = Math.min(pw / cw, ph / ch);
      childRef.current!.style.transform = `scale(${scale})`;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parentRef.current);
    ro.observe(childRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <Box
      ref={parentRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        ref={childRef}
        sx={{
          transformOrigin: 'center',
          display: 'inline-block',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}