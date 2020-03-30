import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const useScrollPosition = () => {
  const [scrollData, setScrollData] = useState({
    x: 0,
    y: 0,
    direction: '',
  });

  // Set scroll position, using previous state to calculate scroll direction
  const setScrollPosition = () => {
    const position = document.body.getBoundingClientRect();
    setScrollData((prev) => ({
      x: position.left,
      y: - position.top,
      direction: - position.top < prev.y ? 'up' : 'down',
    }));
  };

  // Set initial scroll position data
  useEffect(() => {
    setScrollData({
      x: document.body.getBoundingClientRect().left,
      y: - document.body.getBoundingClientRect().top,
      ...scrollData,
    });
  }, []);

  // Update scroll position data on scroll
  useEffect(() => {
    document.addEventListener('scroll', debounce(() => {
      setScrollPosition();
    }, 50));
  }, []);

  return scrollData;
};

export default useScrollPosition;

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
};
