import { useEffect, useMemo, useRef } from 'react';

export default function useUpdateEffect(
  callback: () => void,
  dependencies: any[]
): void {
  const firstRenderRef = useRef(true);
  const deps = useMemo(() => dependencies, dependencies);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, deps);
}

// To omit side effects from happening, when component mounts
// Similar to useEffect, but wont run on component mount
// Usage -> like useEffect
