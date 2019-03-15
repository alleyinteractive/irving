import { useEffect, useState } from 'react';
import breakpoints from 'config/css/breakpoints';

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
