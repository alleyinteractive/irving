import { useEffect, useState } from 'react';
import breakpoints from 'config/css/breakpoints';
import isBrowser from 'utils/isBrowser';

/**
 * Hook for creating an instance of matchMedia for checking a particular breakpoint.
 *
 * @param {string} breakpointName - Breakpoint name. Must correspond to one of the keys in config/css/breakpoints.js
 * @returns {bool} - Does the viewport width match this breakpoint/media query?
 */
export default function useBreakpoint(breakpointName) {
  if (breakpoints[breakpointName] && isBrowser()) {
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
