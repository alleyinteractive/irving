import { useState, useEffect } from 'react';

/**
 * Set up an interval to poll for the presence of a specific DOM node.
 *
 * @param {string} selector A selector pointing to the node for which polling should be set up.
 */
const usePollForNode = (selector) => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    const pollForNode = setInterval(() => {
      // See if a node exists in the DOM for provided selector.
      const queriedNode = document.querySelector(selector);

      if (queriedNode) {
        // Prevent future polling events.
        clearInterval(pollForNode);
        setNode(queriedNode);
      }
    }, 250);

    return () => {
      if (pollForNode) {
        clearInterval(pollForNode);
      }
    };
  }, []);

  return node;
};

export default usePollForNode;
