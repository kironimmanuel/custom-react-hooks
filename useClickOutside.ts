import React, { useEffect, useRef } from 'react';

export const useClickOutside = (callback: () => void) => {
  let domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [domNode, callback]);

  return domNode;
};

// Usage (set ref on element you want to detect click outside of)
// const domNode = useClickOutside(() => {
//   // do something
// });
