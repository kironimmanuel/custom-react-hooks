import { useEffect, useState } from 'react';

export default function useObserver(
  ref: React.RefObject<HTMLElement>
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const options = {
    // root: target.current,
    rootMargin: '0px',
    threshold: 0.5,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
