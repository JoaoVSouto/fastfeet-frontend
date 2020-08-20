import { RefObject, useEffect, useState } from 'react';

export const useIntersection = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit
): [IntersectionObserverEntry | null, () => void] => {
  const [
    intersectionObserverEntry,
    setIntersectionObserverEntry,
  ] = useState<IntersectionObserverEntry | null>(null);

  function removeIntersection(): void {
    setIntersectionObserverEntry(null);
  }

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
      const handler = (entries: IntersectionObserverEntry[]): void => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }

    return () => {
      //
    };
  }, [ref, options]);

  return [intersectionObserverEntry, removeIntersection];
};
