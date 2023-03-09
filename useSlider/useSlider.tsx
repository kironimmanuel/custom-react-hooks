import { useCallback, useEffect, useState } from 'react';
import { ISanityImage } from '../typings';

type UseSliderReturnType = {
  slideIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  goToSlide: (index: number) => void;
};

const getNextIndex = (
  currentIndex: number,
  length: number,
  direction: 'next' | 'prev'
) => {
  const increment = direction === 'next' ? 1 : -1;
  return (currentIndex + increment + length) % length;
};

export const useSlider = (
  slides: ISanityImage[],
  autoplay: boolean = false,
  speed: number = autoplay ? 5 : 0
): UseSliderReturnType => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setSlideIndex((prev) => getNextIndex(prev, slides.length, 'next'));
      }, speed * 1000);
      return () => clearInterval(interval);
    }
  }, [autoplay, speed, slides.length]);

  const goToNextSlide = useCallback(() => {
    setSlideIndex((prev) => getNextIndex(prev, slides.length, 'next'));
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setSlideIndex((prev) => getNextIndex(prev, slides.length, 'prev'));
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setSlideIndex(index);
  }, []);

  return { slideIndex, goToNextSlide, goToPrevSlide, goToSlide };
};
