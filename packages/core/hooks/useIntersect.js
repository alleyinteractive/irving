import { useEffect, useRef, useState } from 'react';

export default (opts = {}) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
  } = opts;
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  // Ensure we don't re-instantiate window. every time we call this hook.
  const observer = useRef(
    new window.IntersectionObserver(
      ([intersectionEntry]) => updateEntry(intersectionEntry),
      {
        root,
        rootMargin,
        threshold,
      }
    )
  );

  useEffect(
    () => {
      const { current: currentObserver } = observer;

      if (node) {
        currentObserver.observe(node);
      }

      return () => currentObserver.unobserve(node);
    },
    [node]
  );

  return [setNode, entry];
};
