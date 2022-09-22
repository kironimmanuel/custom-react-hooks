import { useEffect, useState } from 'react';

const getLocalStorageValue = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key));
  if (storedValue) return storedData;
  if (initialValue instanceof Function) return initialValue;
  return initialValue;
};

export default useLocalStorage = () => {
  // Use function here, so it only runs once the components loads and needs the initialValue
  const [localStorageValue, setLocalStorageValue] = useState(
    () => getLocalStorageValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue));
  }, [localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
};
// Usage similar to useState -> const [data,setData] = useLocalStorage("data","")
