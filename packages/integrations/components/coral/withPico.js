import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import getLogService from '@irvingjs/services/logService';
import CoralEmbed from './index';
import { actionRequireUpgrade } from '../../actions/picoActions';
import {
  tokenSelector,
  requireUsernameSelector,
} from '../../selectors/coralSelector';
import {
  picoLifecycleSelector,
  picoSignalSelector,
} from '../../selectors/picoSelector';

const log = getLogService('irving:integrations:coral:withPico');

const withPico = (ChildComponent) => {
  const wrapped = (props) => {
    const { ssoTiers } = props;

    // Grab the status of whether or not Pico has loaded.
    const { loaded: picoLoaded } = useSelector(picoLifecycleSelector);
    // Grab the value of the Pico signal from the Redux store.
    const { status, tier } = useSelector(picoSignalSelector) || {};
    // Grab the value of the Coral token from the Redux store.
    const coralToken = useSelector(tokenSelector);
    // Grab the true/false value of whether or not a username needs to be set
    // in order to enable commenting privileges from the Redux store.
    const requireUsername = useSelector(requireUsernameSelector);
    // Instantiate a local state value to track the user's ability to log into
    // the Coral embed.
    const [canComment, setCanComment] = useState(false);
    // Recreated events so signal values don't get stale.
    const [embedEventHandlers, setEmbedEventHandlers] = useState(null);

    // Status of embed
    const authenticated = (picoLoaded && ssoTiers.includes(tier) && canComment);
    const unauthenticated = (picoLoaded && ! canComment);

    useEffect(() => {
      log.info(
        '[irving:Coral:withPico] running effect, checking if user can comment'
      );

      if (coralToken && ! requireUsername) {
        log.info('[irving:Coral:withPico] setting canComment: ', true);
        setCanComment(true);
      } else {
        log.info('[irving:Coral:withPico] setting canComment: ', false);
        setCanComment(false);
      }
    }, [coralToken, requireUsername, status, tier]);

    // Define a global dispatch function.
    const dispatch = useDispatch();

    // Define Coral event handlers.
    useEffect(() => {
      const handlers = () => (events) => {
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

      setEmbedEventHandlers(handlers);
    }, [status, tier]);

    if (authenticated) {
      log.info('[irving:Coral:withPico] returning authenticated embed');
      return (
        <ChildComponent {...props} events={embedEventHandlers} accessToken={coralToken} />
      );
    }

    if (unauthenticated) {
      log.info('[irving:Coral:withPico] returning default embed');
      return (
        <ChildComponent {...props} events={embedEventHandlers} />
      );
    }

    log.info('[irving:Coral:withPico] waiting for Pico to load');
    return null;
  };

  wrapped.defaultProps = {
    ssoTiers: [],
  };

  wrapped.propTypes = {
    ssoTiers: PropTypes.arrayOf(PropTypes.string),
  };

  return wrapped;
};

export default withPico(CoralEmbed);
