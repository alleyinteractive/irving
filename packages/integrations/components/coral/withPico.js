import React, { useState, useEffect } from 'react';
import CoralEmbed from './index';

const withPico = (ChildComponent) => (props) => {
  const [picoLoaded, setPicoLoaded] = useState(false);

  useEffect(() => {
    const initHandler = () => {
      setPicoLoaded(true);
    };
    document.addEventListener('pico-init', initHandler);

    const picoButton = document.getElementById('PicoSignal-button');
    if (picoButton) {
      const observer = new MutationObserver((mutations) => {
        console.log(mutations);
      });
      observer.observe(picoButton, { attributes: true });
    }

    return () => {
      document.removeEventListener('pico-init', initHandler);
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
