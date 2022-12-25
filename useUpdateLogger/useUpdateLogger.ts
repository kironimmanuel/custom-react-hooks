import { useEffect } from 'react';

export default function useUpdateLogger<T>(value: T): void {
  useEffect(() => {
    console.log(value);
  }, [value]);
}

// Usage -> useUpdateLogger(var)
// Will log every time var changes
