/* eslint-disable */
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionVerifyPicoUser,
  actionReceiveCoralLogoutRequest,
  actionRequireUpgrade,
  actionReceivePicoPlanUpgrade,
} from '../../actions';
import { requireUpgradeSelector } from '../../selectors/coralSelector';

export default function usePicoObserver(tiers) {
  const [requestSent, setRequestStatus] = useState(false);

  // Define dispatch function.
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

  // Define a function to dispatch a plan upgrade requirement message.
  const dispatchReceivePlanUpgrade = useCallback(
    () => dispatch(actionReceivePicoPlanUpgrade()),
    [dispatch]
  );

  // Define an variable used to signify whether a user is already authenticated
  // with Pico and is required to upgrade their subscription prior to being
  // sent through the Coral SSO workflow.
  const requireUpgrade = useSelector(requireUpgradeSelector);

  // Mount the effect handler.
  useEffect(() => {
    const observerHandler = () => {
      const signalNode = document.getElementById('PicoSignal-container');
      // Only mount the observer if the PicoSignal button exists in the DOM and
      // the Pico data attributes have been appended to the element.
      if (signalNode && signalNode.getAttribute('data-pico-email')) {
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
                // Ensure the user's current tier matches the levels available
                // for Coral SSO.
                if (! tiers.includes(attributes.tier)) {
                  dispatchRequireUpgradeMessage();
                } else {
                  // Dispatch an action that signifies the user has upgraded
                  // their subscription to a level sufficient to enable Coral SSO.
                  if (requireUpgrade) {
                    dispatchReceivePlanUpgrade();
                  }

                  if (! requestSent) {
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
  }, [requireUpgrade]);
}
