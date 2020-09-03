import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import useMutationObserver from '../../hooks/useMutationObserver';
import {
  actionVerifyPicoUser,
  actionRequireUpgrade,
  actionReceivePicoPlanUpgrade,
} from '../../actions/picoActions';
import {
  showUpgradeModalSelector,
  upgradeModalDismissedSelector,
} from '../../selectors/coralSelector';

const PicoObserver = ({
  tiers,
  logoutRequestAction,
}) => {
  // Declare state variables for effects to be run against.
  const [email, setEmail] = useState(undefined);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [canComment, setCanComment] = useState(false);

  const observerCallback = debounce((mutations) => {
    mutations.forEach((mutation) => {
      const { target, type, attributeName } = mutation;

      if ('attributes' === type && 'data-pico-status' === attributeName) {
        const emailAddress = target.getAttribute('data-pico-email');
        const status = target.getAttribute('data-pico-status');
        const tier = target.getAttribute('data-pico-tier');

        const hasValidStatus = 'registered' === status || 'paying' === status;
        const hasNotUpdated = ! isAnonymous || ! isRegistered || ! isPaying;

        if ('excluded' !== status && hasValidStatus && hasNotUpdated) {
          if (undefined === email) {
            setEmail(emailAddress);
          }

          if (tiers.includes(tier)) {
            setCanComment(true);
          }

          if ('registered' === status) {
            setIsRegistered(true);
          }

          if ('paying' === status) {
            setIsPaying(true);
          }
        }

        if ((isRegistered || isPaying) && 'anonymous' === status) {
          if (isRegistered) {
            setIsRegistered(false);
          }

          if (isPaying) {
            setIsPaying(false);
          }

          setEmail(undefined);

          setIsAnonymous(true);
        }
      }
    });
  }, 250);

  // Declare a ref for the `useMutationObserver` hook to watch.
  const signalRef = useRef();
  // Mount the MutationObserver.
  useMutationObserver(signalRef, observerCallback);

  // Define the global dispatch function.
  const dispatch = useDispatch();

  // Define a function to summon an upgrade prompt for Coral SSO.
  const showUpgradeModal = useCallback(
    () => dispatch(actionRequireUpgrade()),
    [dispatch]
  );
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

  // Grab the status of the upgrade modal's visibility from the Redux store.
  const upgradeModalVisible = useSelector(showUpgradeModalSelector);
  const upgradeModalDismissed = useSelector(upgradeModalDismissedSelector);

  useEffect(() => {
    // If the user has been set to anonymous, dispatch the logout request.
    if (canComment && isAnonymous) {
      requestLogout();
      setCanComment(false);
      // Exit the effect early.
      return;
    }

    // If the user is registered but non-paying and the upgrade modal
    // has not been show, update the store to trigger the modal.
    if (
      (
        isRegistered ||
        isPaying
      ) &&
      ! canComment &&
      ! upgradeModalVisible &&
      ! upgradeModalDismissed
    ) {
      console.log('hit one');
      showUpgradeModal();
    }

    // If the user is paying and has commenting privileges, send a request to
    // WordPress to verify the user with Pico and return their JWT.
    if (isPaying && canComment) {
      if (showUpgradeModal) {
        receivePlanUpgrade();
      }

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
    isAnonymous,
    isPaying,
    isRegistered,
    canComment,
    showUpgradeModal,
    upgradeModalDismissed,
  ]);

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
};

PicoObserver.propTypes = {
  tiers: PropTypes.arrayOf(PropTypes.string),
  logoutRequestAction: PropTypes.func.isRequired,
};

export default PicoObserver;
