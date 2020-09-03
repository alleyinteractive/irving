import { useEffect } from 'react';

const defaultConfig = {
  attributes: true,
  characterData: true,
  subtree: true,
  childList: true,
};

export default function useMutationObserver(
  ref,
  callback,
  options = defaultConfig
) {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);

      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
    return null;
  }, [callback, options]);
}
