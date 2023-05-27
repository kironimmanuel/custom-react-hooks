import { useEffect, useState } from 'react';

export const useSlidesInView = ({ slides }: { slides: any[] }) => {
  const [slidesInView, setSlidesInView] = useState<number>(4);
  const [windowSize, setWindowSize] = useState<number>(0);
  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowSize < 768 && slides.length === 1) {
      setIsLoop(false);
      setSlidesInView(1);
    } else if (windowSize < 768 && slides.length > 1) {
      setIsLoop(true);
      setSlidesInView(1);
    } else if (windowSize >= 768 && windowSize <= 1280 && slides.length <= 2) {
      setIsLoop(false);
      setSlidesInView(2);
    } else if (windowSize >= 768 && windowSize <= 1280 && slides.length > 2) {
      setIsLoop(true);
      setSlidesInView(2);
    } else if (windowSize > 1280 && slides.length === 4) {
      setIsLoop(false);
      setSlidesInView(4);
    } else if (windowSize > 1280 && slides.length > 4) {
      setIsLoop(true);
      setSlidesInView(4);
    }
  }, [windowSize, slides]);

  return { isLoop, slidesInView };
};
