import { useEffect } from 'react';

const defaultConfig = {
  attributes: true,
  characterData: true,
  subtree: true,
  childList: true,
};

/**
 * A hook that mounts a MutationObserver on a given React element's ref.
 * @param {object} ref - The React element's ref.
 * @param {func} callback - The callback to be executed when the ref is mutated.
 * @param {object} options - The observer's options.
 */
export default function useMutationObserver(
  id,
  callback,
  options = defaultConfig
) {
  useEffect(() => {
    const node = document.getElementById(id);

    if (node) {
      console.log(node);
      const observer = new MutationObserver(callback);

      observer.observe(node, options);
      return () => {
        observer.disconnect();
      };
    }
    return null;
  }, [callback, options]);
}
