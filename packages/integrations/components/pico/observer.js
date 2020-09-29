/* eslint-disable */
import React, {
  useCallback,
  useEffect,
  useRef,
  // useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import useMutationObserver from '../../hooks/useMutationObserver';
import {
  actionVerifyPicoUser,
  actionReceivePicoPlanUpgrade,
  actionUpdatePicoSignal,
} from '../../actions/picoActions';
import {
  showUpgradeModalSelector,
} from '../../selectors/coralSelector';
import { picoSignalSelector } from '../../selectors/picoSelector';

const PicoObserver = ({
  tiers,
  accessToken,
  logoutRequestAction,
}) => {
  const {
    'data-pico-tier': tier,
    'data-pico-stats': status,
    'data-pico-email': emailAddress,
  } = useSelector(picoSignalSelector);
  const isRegistered = 'registered' === status;
  const isPaying = 'paying' === status;
  const isValidSSOTier = tiers.includes(tier);
  const isAnonymous = 'anonymous' === status;
  const hasValidStatus = isRegistered || isPaying;
  const hasNotUpdated = ! isAnonymous || ! isRegistered || ! isPaying;

  // const manageLocalState = (target) => {
  //   // If the user was previously recognized as registered or paying, but
  //   // is then anonymized, update the state values accordingly.
  //   if (hasValidStatus && 'anonymous' === status) {
  //     if (isRegistered) {
  //       setIsRegistered(false);
  //     }

  //     if (isPaying) {
  //       setIsPaying(false);
  //     }

  //     // Clear the user's email address.
  //     setEmail(undefined);
  //     // Set the user's status to anonymous.
  //     setIsAnonymous(true);
  //   }
  // };

  // Define the global dispatch function.
  const dispatch = useDispatch();

  // Define a function to dispatch Pico user verification requests.
  const sendVerificationRequest = useCallback(
    (user) => dispatch(actionVerifyPicoUser(user)),
    [dispatch]
  );

  // Define a function to dispatch a plan upgrade requirement message.
  const receivePlanUpgrade = useCallback(
    () => dispatch(actionReceivePicoPlanUpgrade()),
    [dispatch]
  );

  // Define a function to dispatch logout requests. This function is explicitly
  // passed through props because the observer may want to cause side-effects
  // in the application outside of the context of Pico.
  const requestLogout = useCallback(
    () => dispatch(logoutRequestAction()),
    [dispatch]
  );

  /**
   * Update a signal value in the Pico redux state.
   */
  const updateSignal = useCallback(
    (signalObject) => dispatch(actionUpdatePicoSignal(signalObject)),
    [dispatch]
  );

  // Grab the status of the upgrade modal's visibility from the Redux store.
  const showUpgradeModal = useSelector(showUpgradeModalSelector);

  useEffect(() => {
    if (! accessToken && isPaying && isValidSSOTier) {
      setTimeout(() => {
        if (window.Pico && 'object' === typeof window.Pico.user) {
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
  }, [
    email,
    isPaying,
    isValidSSOTier,
  ]);

  useEffect(() => {
    if (! accessToken && isPaying && isValidSSOTier && showUpgradeModal) {
      receivePlanUpgrade();
    }
  }, [
    isPaying,
    isValidSSOTier,
    showUpgradeModal,
  ]);

  useEffect(() => {
    // If the user has been set to anonymous, dispatch the logout request.
    if (isValidSSOTier && isAnonymous) {
      requestLogout();
    }
  }, [isValidSSOTier, isAnonymous]);

  const observerCallback = debounce((mutations) => {
    mutations.forEach((mutation) => {
      const {
        target,
        type,
        attributeName,
      } = mutation;

      if ('attributes' === type && 'data-pico-status' === attributeName) {
        const signalObject = [...target.attributes].reduce((acc, attr) => {
          const {
            name,
            value,
          } = attr;

          if (name.includes('data-pico')) {
            return {
              ...acc,
              [name]: value,
            }
          }

          return acc;
        }, {});

        updateSignal(signalObject);
      }
    });
  }, 50);

  // Declare a ref for the `useMutationObserver` hook to watch.
  const signalRef = useRef();
  // Mount the MutationObserver.
  useMutationObserver(signalRef, observerCallback);

  return (
    <div
      ref={signalRef}
      className="PicoSignal"
      style={{ display: 'none' }}
    />
  );
};

PicoObserver.defaultProps = {
  tiers: [],
  accessToken: '',
};

PicoObserver.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.string),
  accessToken: PropTypes.string,
  logoutRequestAction: PropTypes.func.isRequired,
};

export default PicoObserver;
