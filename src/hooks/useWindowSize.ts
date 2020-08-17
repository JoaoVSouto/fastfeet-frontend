import { useState, useEffect } from 'react';

interface IWindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): IWindowSize {
  function getSize(): IWindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
