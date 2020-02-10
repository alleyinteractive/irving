import { useEffect, useRef, useState } from 'react';

const useIntersect = (opts = {}) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    delay = 250,
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
      }
    )
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
