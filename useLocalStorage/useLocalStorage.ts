import { useEffect, useState } from 'react';

type InitialValueType<T> = T | (() => T);

const getLocalStorageValue = <T>(
  key: string,
  initialValue: InitialValueType<T>
): T => {
  const storedValue = JSON.parse(localStorage.getItem(key)) as T;
  if (storedValue !== null) return storedValue;
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

export default function useLocalStorage<T>(
  key: string,
  initialValue: InitialValueType<T>
): [T, (value: T) => void] {
  // Use function here, so it only runs once the components loads and needs the initialValue
  const [localStorageValue, setLocalStorageValue] = useState(() =>
    getLocalStorageValue(key, initialValue)
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}

// Usage similar to useState -> const [localStorageValue, setLocalStorageValue] = useLocalStorage<string>("data", "");
