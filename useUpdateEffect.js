import { useEffect, useRef } from 'react';

export default useUpdateEffect = (callback, dependencies) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
};
// To omit side effects from happening, when component mounts
// Similar to useEffect, but wont run on component mount
// Usage -> like useEffect
