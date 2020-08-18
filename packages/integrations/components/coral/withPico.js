import React, { useState, useEffect } from 'react';
import CoralEmbed from './index';

const withPico = (ChildComponent) => (props) => {
  const [picoLoaded, setPicoLoaded] = useState(false);

  useEffect(() => {
    // The observer variable needs to be defined outside of the init context
    // so that it can be disconnected when the `withPico` component unmounts.
    let observer;

    const loadHandler = () => {
      setPicoLoaded(true);
    };

    // Listen for pico to be initialized.
    document.addEventListener('pico-init', loadHandler);

    if (picoLoaded) {
      const picoButton = document.getElementById('PicoSignal-button');
      // Only mount the observer if the PicoSignal button exists in the DOM and
      // the Pico data attributes have been appended to the element.
      if (picoButton && null !== picoButton.getAttribute('data-pico-email')) {
        // Define the observer.
        observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const {
              type,
              attributeName,
            } = mutation;
            // Execute the webhook on the `data-pico-status` attribute.
            if ('attributes' === type && 'data-pico-status' === attributeName) {
              // Create a reusable store for attribute values.
              const attributes = {
                registered: picoButton.getAttribute('data-pico-status'),
                email: picoButton.getAttribute('data-pico-email'),
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
        observer.observe(picoButton, { attributes: true });
      }
    }

    return () => {
      document.removeEventListener('pico-init', loadHandler);

      if (observer) {
        observer.disconnect();
      }
    };
  }, [picoLoaded]);

  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const picoButton = document.getElementById('PicoSignal-button');

      if (picoButton) {
        picoButton.click();
      }
    });
  };

  if (picoLoaded) {
    return (
      <>
        <ChildComponent {...props} events={handlers} />
        <input
          type="button"
          id="PicoSignal-button"
          className="PicoRule PicoSignal PicoManageAccount"
          style={{ display: 'none' }}
        />
      </>
    );
  }

  return null;
};

export default withPico(CoralEmbed);
