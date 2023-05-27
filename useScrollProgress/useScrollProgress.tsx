import { useCallback, useEffect, useState } from 'react';

export const useScrollProgress = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const onScroll = useCallback(() => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return scrollTop;
};
