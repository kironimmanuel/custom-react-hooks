import { useEffect, useState } from 'react';

export const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const listener = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return {
    width,
    height,
  };
};

// Usage
// const windowSize = useWindowResize();
// if(windowSize.width < 768) {
//  // do something
// }
