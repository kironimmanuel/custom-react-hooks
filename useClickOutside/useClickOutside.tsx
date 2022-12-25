import { useEffect, useRef } from "react";

export const useClickOutside = (callback: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [domNode, callback]);

  return domNode;
};

// Usage (set ref on element you want to detect click outside of):
// const domNode = useClickOutside(() => {
// do something...
// });
