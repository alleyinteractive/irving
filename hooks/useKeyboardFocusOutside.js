import { useEffect } from 'react';
/**
 * Hook for detecting if the currently focused element is outside of a parent element.
 *
 * @param {object} ref - ref for the element, created with useRef().
 * @param {function} fn - The function that should execute when focus leaves the element.
 */
const useKeyboardFocusOutside = (ref, fn) => {
  const handleFocusOutside = (e) => {
    if (
      ref.current &&
      ! ref.current.contains(document.activeElement) &&
      'Tab' === e.key
    ) {
      fn();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleFocusOutside);

    return () => {
      document.removeEventListener('keyup', handleFocusOutside);
    };
  });
};

export default useKeyboardFocusOutside;
