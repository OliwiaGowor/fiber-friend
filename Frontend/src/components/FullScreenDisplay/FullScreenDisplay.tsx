import React, { useEffect, useState } from 'react';
import classes from './FullScreenDisplay.module.scss';

interface FullScreenDisplayProps {
  src: string;
  alt: string;
  type: string;
  orgWidth: number;
  orgHeight: number;
}

const FullScreenDisplay = ({ src, alt, type, orgHeight, orgWidth }: FullScreenDisplayProps) => {
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number }>({
    width: orgWidth,
    height: orgHeight,
  });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const aspectRatio = orgWidth / orgHeight;
      let newWidth = screenWidth;
      let newHeight = screenWidth / aspectRatio;

      if (newHeight > screenHeight) {
        newHeight = screenHeight;
        newWidth = screenHeight * aspectRatio;
      }

      setDisplaySize({
        width: newWidth,
        height: newHeight,
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [src]);

  const displayDifferentFiles = () => {
    if (type == 'pdf') {
      return (
        <object
          className={classes.photo}
          data={src}
          width={displaySize.width}
          height={displaySize.height}
          style={{ width: displaySize.width, height: displaySize.height, objectFit: 'cover' }}
        >
        </object>
      );
    }
    else {
      return (
        <img
          className={classes.photo}
          src={src}
          alt={alt}
          loading="lazy"
          width={displaySize.width}
          height={displaySize.height}
          style={{ width: displaySize.width, height: displaySize.height, objectFit: 'cover' }}
        />
      );
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {displayDifferentFiles()}
    </div>
  );
};

export default FullScreenDisplay;
