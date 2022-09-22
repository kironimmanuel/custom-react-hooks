import { useEffect, useState } from 'react';

export default useObserver = ref => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // OPTIONS
  const options = {
    // root: target.current,
    rootMargin: '0px',
    threshold: 0.5, // A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
  };
  // Observer
  const observer = new IntersectionObserver(
    ([entry]) => setIsIntersecting(entry.isIntersecting),
    options
  );
  // Use Effect
  useEffect(() => {
    observer.observe(ref.current);
    // DISCONNECT
    return () => observer.disconnect();
  }, []);
  // Return
  return isIntersecting;
};
