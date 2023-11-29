import { useEffect, useState } from 'react';
import classes from './FullScreenDisplay.module.scss';
import { File } from '../../DTOs/File';

interface FullScreenDisplayProps {
  file: File;
}

const FullScreenDisplay = ({ file }: FullScreenDisplayProps) => {
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      const img = new Image();
      img.src = file.src;
      console.log(img, img.naturalWidth, img.naturalHeight)
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const aspectRatio = img.naturalWidth / img.naturalHeight;
      console.log(aspectRatio)
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
  }, [file]);

  const displayDifferentFiles = () => {
    if ( file.type == 'pdf') {
      return (
        <object
          className={classes.file}
          data={file.src}
          width={displaySize.width}
          height={displaySize.height}
          style={{ width: displaySize.width, height: displaySize.height, objectFit: 'contain' }}
        >
        </object>
      );
    }
    else {
      return (
        <img
          className={classes.file}
          src={file.src}
          alt={file.alt}
          loading="lazy"
          width={displaySize.width}
          height={displaySize.height}
          style={{ width: displaySize.width, height: displaySize.height, objectFit: 'contain' }}
        />
      );
    }
  }

  return (
    <div className={classes.fullscreenContainer}>
      {displayDifferentFiles()}
    </div>
  );
};

export default FullScreenDisplay;
