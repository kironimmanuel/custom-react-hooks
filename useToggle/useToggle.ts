import { useState } from 'react';

export default function useToggle(
  initialValue: boolean
): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggleValue = (value?: boolean) => {
    setValue(currentValue =>
      typeof value === 'boolean' ? value : !currentValue
    );
  };
  return [value, toggleValue];
}

// Usage -> const [state, setState] = useToggle(boolean);
