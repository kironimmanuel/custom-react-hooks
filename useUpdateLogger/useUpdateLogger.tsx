import { useEffect } from 'react';

export function useUpdateLogger<T>(value: T): void {
  useEffect(() => {
    console.log(value);
  }, [value]);
}

// Usage -> useUpdateLogger(var)
// Will log every time the variable changes
