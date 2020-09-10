import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoralEmbed from './index';
import { actionRequireUpgrade } from '../../actions/picoActions';
import {
  tokenSelector,
  verificationRequestSelector,
} from '../../selectors/coralSelector';
import { picoLoadedSelector } from '../../selectors/picoSelector';

const withPico = (ChildComponent) => (props) => {
  const dispatch = useDispatch();
  // Define a function to summon an upgrade prompt for Coral SSO.
  const showUpgradeModal = useCallback(
    () => dispatch(actionRequireUpgrade()),
    [dispatch]
  );

  const { ssoTiers: tiers } = props; /* eslint-disable-line */

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

  const picoLoaded = useSelector(picoLoadedSelector);
  const requestSent = useSelector(verificationRequestSelector);
  const [canComment, setCanComment] = useState(null);

  useEffect(() => {
    const signalNode = document.getElementById('PicoSignal-container');

    if (signalNode) {
      const tier = signalNode.getAttribute('data-pico-tier');

      if (! tier && null !== tier) {
        setCanComment(false);
      }

      if (tiers.includes(tier)) {
        setCanComment(true);
      }

      if (! tiers.includes(tier) && null !== tier) {
        setCanComment(false);
      }
    }
  }, [picoLoaded, requestSent]);

  // Retrieve the Coral SSO token from the Redux store.
  const coralToken = useSelector(tokenSelector);

  if (coralToken && canComment && requestSent) {
    return (
      <ChildComponent
        {...props}
        events={handlers}
        accessToken={coralToken}
      />
    );
  }

  return (
    <ChildComponent
      {...props}
      events={handlers}
    />
  );
};

export default withPico(CoralEmbed);
