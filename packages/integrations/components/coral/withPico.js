import React, { useEffect } from 'react';
import CoralEmbed from './index';

const withPico = (ChildComponent) => (props) => {
  useEffect(() => {
    const listener = () => {
      console.log('pico loaded');
    };
    window.document.addEventListener('pico-init', listener);

    return () => window.document.removeEventListener('pico-init', listener);
  }, []);

  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const {
        location,
      } = window;

      location.assign('?pn=manage_account');
    });
  };

  return (
    <ChildComponent {...props} events={handlers} />
  );
};

export default withPico(CoralEmbed);
