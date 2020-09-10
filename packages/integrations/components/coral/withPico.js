import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoralEmbed from './index';
import { actionRequireUpgrade } from '../../actions/picoActions';
import { tokenSelector } from '../../selectors/coralSelector';

const withPico = (ChildComponent) => (props) => {
  const dispatch = useDispatch();
  // Define a function to summon an upgrade prompt for Coral SSO.
  const showUpgradeModal = useCallback(
    () => dispatch(actionRequireUpgrade()),
    [dispatch]
  );

  const { ssoTiers: tiers } = props;

  // Define Coral event handlers.
  const handlers = (events) => {
    events.on('loginPrompt', () => {
      const signalNode = document.getElementById('PicoSignal-container');

      if (signalNode) {
        const status = signalNode.getAttribute('data-pico-status');
        const tier = signalNode.getAttribute('data-pico-tier');

        // If the user is registered but not paying show the upgrade modal on click.
        if ('registered' === status) {
          showUpgradeModal();
        } else if ('paying' === status && ! tiers.includes(tier)) {
          // If the user is paying but cannot comment, prompt them to upgrade their subscription.
          showUpgradeModal();
        } else {
          // Summon the base Pico modal.
          const ruleNode = document.getElementById('PicoRule-button');

          if (ruleNode) {
            ruleNode.click();
          }
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
