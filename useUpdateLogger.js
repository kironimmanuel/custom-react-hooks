import { useEffect } from 'react';

export default useUpdateLogger = value => {
  useEffect(() => {
    console.log(value);
  }, [value]);
};
// Usage -> useUpdateLogger(var)
// Will log every time var changes
