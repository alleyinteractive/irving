import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoralEmbed from './index';
import {
  actionVerifyPicoUser,
  actionReceiveCoralLogoutRequest,
  actionRequireUpgrade,
} from '../../actions';
import { tokenSelector } from '../../selectors/coralSelector';

const withPico = (ChildComponent) => (props) => {
  const [verificationRequestSent, setRequestStatus] = useState(false);

  const dispatch = useDispatch();
  // Define a function to summon an upgrade prompt for Coral SSO.
  const dispatchRequireUpgradeMessage = useCallback(
    () => dispatch(actionRequireUpgrade()),
    [dispatch]
  );
  // Define a function to dispatch Pico user verification requests.
  const dispatchVerificationRequest = useCallback(
    (user) => {
      // Update the request status variable so that multiple verification
      // requests are prevented.
      setRequestStatus(true);
      // Dispatch the action.
      return dispatch(actionVerifyPicoUser(user));
    },
    [dispatch]
  );
  // Define a function to dispatch logout requests via SSO.
  const dispatchLogoutRequest = useCallback(
    () => dispatch(actionReceiveCoralLogoutRequest()),
    [dispatch]
  );

  useEffect(() => {
    const observerHandler = () => {
      const signalNode = document.getElementById('PicoSignal-container');
      // Only mount the observer if the PicoSignal button exists in the DOM and
      // the Pico data attributes have been appended to the element.
      if (
        signalNode &&
        null !== signalNode.getAttribute('data-pico-email') &&
        false === verificationRequestSent
      ) {
        // Define the observer.
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const { type, attributeName } = mutation;

            // Execute the webhook on the `data-pico-status` attribute.
            if ('attributes' === type && 'data-pico-status' === attributeName) {
              // Create a reusable store for attribute values.
              let attributes = {
                registered: signalNode.getAttribute('data-pico-status'),
                email: signalNode.getAttribute('data-pico-email'),
                tier: signalNode.getAttribute('data-pico-tier'),
              };

              // Once the `data-pico-status` and `data-pico-email` attributes are
              // populated, send a request to Pico to verify the user and retrieve
              // a JWT for logging the user into Coral via SSO.
              if (
                0 < attributes.email.length &&
                'registered' === attributes.registered
              ) {
                // TODO: Fix me. This is a temporary identifier for upgrade prompt.
                if ('pal' !== attributes.tier) {
                  dispatchRequireUpgradeMessage();
                } else {
                  // Set a delay in order for the global Pico object to update with
                  // the user's ID prior to dispatching the verification request.
                  setTimeout(() => {
                    // Add the Pico user's ID to the attributes array.
                    if (window.Pico && 'object' === typeof window.Pico.user) {
                      attributes = {
                        ...attributes,
                        id: window.Pico.user.id,
                      };
                    }
                    dispatchVerificationRequest(attributes);
                  }, 50);
                }
              }

              // If the `data-pico-status` and `data-pico-email` attributes are
              // cleared, force the user to be logged out from the Coral instance.
              if (
                0 >= attributes.email.length &&
                'registered' !== attributes.registered
              ) {
                dispatchLogoutRequest();
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
