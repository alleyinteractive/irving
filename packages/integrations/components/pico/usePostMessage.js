import { useEffect } from 'react';

const usePostMessage = (origin, callback, deps = []) => {
  const handler = (event) => {
    if (
      origin === event.origin ||
      event.origin.includes(origin)
    ) {
      callback(event);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handler);

    return () => (
      window.removeEventListener('message', handler)
    );
  }, deps);
};

export default usePostMessage;
