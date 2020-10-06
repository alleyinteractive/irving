import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoralEmbed from './index';
import { actionRequireUpgrade } from '../../actions/picoActions';
import {
  tokenSelector,
  requireUsernameSelector,
} from '../../selectors/coralSelector';
import { picoSignalSelector } from '../../selectors/picoSelector';

const withPico = (ChildComponent) => (props) => {
  const { ssoTiers } = props;
  // Define a global dispatch function.
  const dispatch = useDispatch();
  // Grab the value of the Pico signal from the Redux store.
  const { status, tier } = useSelector(picoSignalSelector) || {};
  // Grab the value of the Coral token from the Redux store.
  const coralToken = useSelector(tokenSelector);
  // Grab the true/false value of whether or not a username needs to be set
  // in order to enable commenting privileges from the Redux store.
  const requireUsername = useSelector(requireUsernameSelector);

  // Define Coral event handlers.
  const handlers = (events) => {
    events.on('loginPrompt', () => {
      // If the user is registered but not paying show the upgrade modal on click.
      if ('registered' === status) {
        dispatch(actionRequireUpgrade());
      } else if ('paying' === status && ! ssoTiers.includes(tier)) {
        // If the user is paying but cannot comment, prompt them to upgrade their subscription.
        dispatch(actionRequireUpgrade());
      } else {
        // Summon the base Pico modal.
        const ruleNode = document.getElementById('PicoRule-button');

        if (ruleNode) {
          ruleNode.click();
        }
      }
    });

    events.onAny((eventName, data) => {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: `${eventName}Coral`,
        coralEvent: {
          ...data,
        },
      });
    });
  };

  if (coralToken && ssoTiers.includes(tier) && ! requireUsername) {
    return (
      <ChildComponent {...props} events={handlers} accessToken={coralToken} />
    );
  }

  return (
    <ChildComponent {...props} events={handlers} />
  );
};

export default withPico(CoralEmbed);
