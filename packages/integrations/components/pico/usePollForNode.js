import { useState, useEffect } from 'react';

const usePollForNode = (selector) => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    // See if a node exists in the DOM for provided selector.
    const queriedNode = document.querySelector(selector);

    const pollForNode = setInterval(() => {
      if (queriedNode) {
        // Prevent future polling events.
        setNode(queriedNode);
        clearInterval(pollForNode);
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
