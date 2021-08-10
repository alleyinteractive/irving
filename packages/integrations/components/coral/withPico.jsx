import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import getEnv from '@irvingjs/core/config/irving/getEnv';
import getLogService from '@irvingjs/services/logService';
import CoralEmbed from './index';
import { actionRequireUpgrade } from '../../actions/picoActions';
import { actionReceiveCoralToken } from '../../actions/coralActions';
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
    const { email, status, tier } = useSelector(picoSignalSelector) || {};
    // Grab the value of the Coral token from the Redux store.
    const coralToken = useSelector(tokenSelector);
    // Grab the true/false value of whether or not a username needs to be set
    // in order to enable commenting privileges from the Redux store.
    const requireUsername = useSelector(requireUsernameSelector);
    // Instantiate a local state value to track the user's ability to log into
    // the Coral embed.
    const [canComment, setCanComment] = useState(false);

    useEffect(() => {
      log.info(
        'running effect, checking if user can comment',
      );

      if (coralToken && !requireUsername) {
        log.info('setting canComment: ', true);
        setCanComment(true);
      } else {
        log.info('setting canComment: ', false);
        setCanComment(false);
      }
    }, [coralToken, requireUsername, status, tier]);

    // Define a global dispatch function.
    const dispatch = useDispatch();

    // Define Coral event handlers.
    const handlers = (events) => {
      events.on('loginPrompt', async () => {
        const id = window.Pico.user.id || '';

        // If the user is registered but not paying show the upgrade modal on click.
        if (status === 'registered') {
          dispatch(actionRequireUpgrade());
        } else if (status === 'paying' && !ssoTiers.includes(tier)) {
          // If the user is paying but cannot comment, prompt them to upgrade their subscription.
          dispatch(actionRequireUpgrade());
        } else if (
          status === 'paying'
          && ssoTiers.includes(tier)
          && id !== ''
        ) {
          const { API_ROOT_URL } = getEnv();
          const { status: ssoStatus, jwt } = await fetch(
            `${API_ROOT_URL}/data/validate_sso_user?user=${encodeURIComponent(email)}&id=${id}`, // eslint-disable-line max-len
          ).then((res) => res.json());

          if (ssoStatus === 'success') {
            dispatch(actionReceiveCoralToken(jwt));
          }
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

    if (
      status !== undefined
      && picoLoaded
      && ssoTiers.includes(tier)
      && canComment
    ) {
      log.info('returning authenticated embed');
      return (
        <ChildComponent {...props} events={handlers} accessToken={coralToken} />
      );
    }

    if (status !== undefined && picoLoaded && !canComment) {
      log.info('returning default embed');
      return (
        <ChildComponent {...props} events={handlers} />
      );
    }

    log.info('waiting for Pico to load');
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
