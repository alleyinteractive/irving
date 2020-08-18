import React, { useEffect } from 'react';
import CoralEmbed from './index';

const withPico = (ChildComponent) => (props) => {
  /* eslint-disable */
  useEffect(() => {
    const listener = () => {
      console.log('pico loaded');

      const element = document.getElementById('PicoSignal-button');
      // const event = null;
      const observer = new MutationObserver((mutations) => {
        console.log(mutations);
      });
      observer.observe(element, { attributes: true });
    };
    document.addEventListener('pico.loaded', listener);

    return () => {
      document.removeEventListener('pico.loaded', listener);
    }
  }, []);
  /* eslint-enable */

  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const picoButton = document.getElementById('PicoSignal-button');

      if (picoButton) {
        picoButton.click();
      }
    });
  };

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
};

export default withPico(CoralEmbed);
