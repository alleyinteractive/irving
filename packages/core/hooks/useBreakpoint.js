import { useEffect, useState } from 'react';

/**
 * Hook for creating an instance of matchMedia for checking a particular breakpoint or media query.
 *
 * @param {string} mediaQuery Media query to check against
 * @returns {bool} Does the viewport width match this breakpoint or media query?
 */
export default function useMedia(mediaQuery) {
  const mq = window.matchMedia(mediaQuery);
  const [matches, setMatches] = useState(mq.matches);
  const checkMq = (e) => {
    setMatches(e.matches);
  };

  useEffect(() => {
    mq.addListener(checkMq);

    return function cleanup() {
      mq.removeListener(checkMq);
    };
  });

  return matches;
}
