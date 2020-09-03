import React from 'react';
import { useSelector } from 'react-redux';
import CoralEmbed from './index';
import { tokenSelector } from '../../selectors/coralSelector';

const withPico = (ChildComponent) => (props) => {
  // Define Coral event handlers.
  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const picoButton = document.getElementById('PicoRule-button');

      if (picoButton) {
        picoButton.click();
      }
    });
  };

  // Retrieve the Coral SSO token from the Redux store.
  const coralToken = useSelector(tokenSelector);

  return (
    <ChildComponent
      {...props}
      events={handlers}
      accessToken={coralToken}
    />
  );
};

export default withPico(CoralEmbed);
