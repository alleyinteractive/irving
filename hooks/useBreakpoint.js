import { useEffect, useState } from 'react';
import breakpoints from 'config/css/breakpoints';

/**
 * Hook for creating a script tag for an external script and inserting it into the DOM.
 *
 * @param {string} breakpointName - Breakpoint name. Must correspond to one of the keys in config/css/breakpoints.js
 * @returns {bool} - Does the viewport width match this breakpoint/media query?
 */
export default function useBreakpoint(breakpointName) {
  if (breakpoints[breakpointName]) {
    const mq = window.matchMedia(`(${breakpoints[breakpointName]})`);
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

  return false;
}
