import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const useReadPercentage = (ref) => {
  const [readPercentage, updateReadPercentage] = useState(0);

  const setReadPercentage = () => {
    const el = ref.current;
    const position = el.getBoundingClientRect();
    const currentPos = (window.innerHeight - position.top) / el.clientHeight;
    const newPercentage = (1 > currentPos) ? Math.ceil(currentPos * 100) : 100;

    if (readPercentage < newPercentage) {
      updateReadPercentage(() => newPercentage);
    }
  };

  useEffect(() => {
    const callback = debounce(() => {
      setReadPercentage();
    }, 50);

    document.addEventListener('scroll', callback);

    return () => (document.removeEventListener('scroll', callback));
  }, []);

  return readPercentage;
};

export default useReadPercentage;
