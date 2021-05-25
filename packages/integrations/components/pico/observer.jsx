import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import usePollForNode from './usePollForNode';
import {
  actionVerifyPicoUser,
  actionReceivePicoPlanUpgrade,
  actionUpdatePicoSignal,
} from '../../actions/picoActions';
import { picoSignalSelector } from '../../selectors/picoSelector';
import { actionReceiveCoralLogoutRequest } from '../../actions/coralActions';
import {
  tokenSelector,
  showUpgradeModalSelector,
} from '../../selectors/coralSelector';

const PicoObserver = ({ tiers }) => {
  // Define a global dispatch function.
  const dispatch = useDispatch();
  // Define a function to dispatch user verification requests to the Pico API.
  const sendVerificationRequest = useCallback(
    (user) => dispatch(actionVerifyPicoUser(user)),
    [dispatch],
  );
  // Define a function that will set the visibility state of the plan upgrade modal.
  const receivePlanUpgrade = useCallback(
    () => dispatch(actionReceivePicoPlanUpgrade()),
    [dispatch],
  );
  // Define a function to dispatch logout requests.
  const requestLogout = useCallback(
    () => dispatch(actionReceiveCoralLogoutRequest()),
    [dispatch],
  );
  // Define a function that updates the signal object in the Redux store.
  const updateSignal = useCallback(
    (signalObject) => dispatch(actionUpdatePicoSignal(signalObject)),
    [dispatch],
  );

  // Grab the value of the Pico signal from the Redux store.
  const { status, tier, email } = useSelector(picoSignalSelector) || {};
  // Define effect constants based on values present in the signal object.
  const isAnonymous = status === 'anonymous';
  const isPaying = status === 'paying';
  const isValidSSOTier = tiers.includes(tier);
  // Grab the status of the Coral upgrade modal visibility state from the Redux store.
  const showUpgradeModal = useSelector(showUpgradeModalSelector);
  // Grab the value of the Coral JWT token from the Redux store.
  const coralToken = useSelector(tokenSelector);

  // Poll for the existence of the Pico signal container.
  const signal = usePollForNode('#PicoSignal-container');

  // Check current attribute values on Pico signal and dispatch updates.
  const checkSignalAttributes = (target) => {
    const emailAttr = target.getAttribute('data-pico-email');
    const statusAttr = target.getAttribute('data-pico-status');
    const tierAttr = target.getAttribute('data-pico-tier');

    updateSignal({
      email: emailAttr,
      status: statusAttr,
      tier: tierAttr,
    });
  };

  // Define the callback referenced in the `useMutationObserver` hook that listens
  // for changes to the target DOM element.
  const observerCallback = (mutations) => {
    mutations.forEach((mutation) => {
      const { target, type, attributeName } = mutation;

      if (type === 'attributes' && attributeName === 'data-pico-status') {
        checkSignalAttributes(target);
      }
    });
  };

  useEffect(() => {
    if (signal) {
      // Update with initial attribute values.
      checkSignalAttributes(signal);

      // Add observer.
      const observer = new MutationObserver(observerCallback);

      observer.observe(signal, { attributes: true });
      return () => {
        observer.disconnect();
      };
    }

    return () => {};
  }, [signal]);

  useEffect(() => {
    if (coralToken && isAnonymous) {
      requestLogout();
    }
  }, [coralToken, isAnonymous]);

  useEffect(() => {
    if (!coralToken && isValidSSOTier) {
      setTimeout(() => {
        if (window.Pico && typeof window.Pico.user === 'object') {
          const {
            Pico: {
              user: {
                id,
              },
            },
          } = window;

          sendVerificationRequest({ email, id });
        }
      }, 50);
    }
  }, [coralToken, isValidSSOTier]);

  useEffect(() => {
    if (!coralToken && isPaying && isValidSSOTier && showUpgradeModal) {
      receivePlanUpgrade();
    }
  }, [coralToken, isPaying, isValidSSOTier, showUpgradeModal]);

  return (
    <div id="pico-observer" style={{ display: 'none' }} />
  );
};

PicoObserver.defaultProps = {
  tiers: [],
};

PicoObserver.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.string),
};

export default PicoObserver;
