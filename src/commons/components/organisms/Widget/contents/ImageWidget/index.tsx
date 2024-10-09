import React, { useState, useEffect } from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.src = link;
    img.onload = () => {
      setAspectRatio(img.height / img.width);
    };
  }, [link]);

  return (
    <div
      style={{
        width: '100%',
        paddingTop: `${aspectRatio * 100}%`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${link})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
        title={null}
      />
    </div>
  );
};

export default ImageWidget;