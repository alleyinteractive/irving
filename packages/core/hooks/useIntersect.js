import { useEffect, useRef, useState } from 'react';

/**
 * Hook for observing DOM nodes using IntersectionObserver.
 * Code based on work in https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
 *
 * @param {object} opts Options for IntersectionObserver (see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 */
const useIntersect = (opts = {}) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    delay = 100,
  } = opts;
  const [node, setNode] = useState(null);
  const [entry, updateEntry] = useState({});

  // Ensure we don't re-instantiate the observer every time we call this hook.
  const observer = useRef(
    new window.IntersectionObserver(
      ([intersectionEntry]) => updateEntry(intersectionEntry),
      {
        root,
        rootMargin,
        threshold,
        delay,
      },
    ),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => {
      if (node) {
        currentObserver.unobserve(node);
      }
    };
  }, [node]);

  return [setNode, entry];
};

export default useIntersect;
