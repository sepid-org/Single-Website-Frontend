import React, { useState, useEffect, useRef } from 'react';

const GameContainer = ({ children, designedWidth = 1280, designedHeight = 720 }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const scaleX = window.innerWidth / designedWidth;
        const scaleY = window.innerHeight / designedHeight;
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, [designedWidth, designedHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: designedWidth,
          height: designedHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GameContainer;