import React, { useEffect } from 'react';
import CoralEmbed from './index';

const withPico = (ChildComponent) => (props) => {
  useEffect(() => {
    const observerHandler = () => {
      const signalNode = document.getElementById('PicoSignal-container');
      // Only mount the observer if the PicoSignal button exists in the DOM and
      // the Pico data attributes have been appended to the element.
      if (signalNode && null !== signalNode.getAttribute('data-pico-email')) {
        // Define the observer.
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const {
              type,
              attributeName,
            } = mutation;
            // Execute the webhook on the `data-pico-status` attribute.
            if ('attributes' === type && 'data-pico-status' === attributeName) {
              // Create a reusable store for attribute values.
              const attributes = {
                registered: signalNode.getAttribute('data-pico-status'),
                email: signalNode.getAttribute('data-pico-email'),
              };

              const isRegistered = 'registered' === attributes.registered;
              const hasEmail = 0 < attributes.email.length;

              if (isRegistered && hasEmail) {
                // do something.
                console.log(attributes);
              }
            }
          });
        });
        observer.observe(signalNode, { attributes: true });
      }
    };
    // Wait for Pico to load in order to mount the observer.
    window.addEventListener('pico.loaded', observerHandler);

    return () => window.removeEventListener('pico.loaded', observerHandler);
  }, []);

  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const picoButton = document.getElementById('PicoRule-button');

      if (picoButton) {
        picoButton.click();
      }
    });
  };

  return <ChildComponent {...props} events={handlers} />;
};

export default withPico(CoralEmbed);
