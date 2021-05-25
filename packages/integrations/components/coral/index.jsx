import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';
import {
  actionReceiveCoralLogin,
  actionReceiveCoralLogout,
} from '../../actions/coralActions';
import {
  purgeSelector,
} from '../../selectors/coralSelector';

let embed = false;

const CoralEmbed = ({
  accessToken,
  embedUrl,
  events,
}) => {
  if (!embedUrl) {
    return null;
  }

  const loaded = useLoadScript(
    `${embedUrl}/assets/js/embed.js`,
    'coral',
  );

  const dispatch = useDispatch();
  // Define a function that will update the store when the user logs out.
  const dispatchLogout = useCallback(
    () => dispatch(actionReceiveCoralLogout()),
    [dispatch],
  );
  // Define a function that will update the store when a user logs in.
  const dispatchLogin = useCallback(
    () => dispatch(actionReceiveCoralLogin()),
    [dispatch],
  );

  // Define whether or not the user is set to be purged. This must be defined
  // outside of the `useEffect` call in order to align with the rules of hooks.
  // https://reactjs.org/docs/hooks-rules.html
  const shouldPurgeUser = useSelector(purgeSelector);

  /**
   * Decode the payload of a JWT token so it becomes a base64 encoded string.
   *
   * This fixes an issue with the way Coral decodes JWT access token payloads
   * using `atob()`, which assumes the string is base64. When URL safe string
   * replacements for `+` and `/` are included, Coral will not be able to
   * decode the string properly and fail to log in the user.
   *
   * @see https://stackoverflow.com/questions/49082844/how-could-firebase-send-a-jwt-token-which-payload-contains-an-underscore-charact
   *
   * @param string token A base64url encoded JWT token.
   * @returns string A JWT token with a base64 payload.
   */
  const base64UrlDecodeJWTPayload = (token) => {
    // Split the token into parts so we can decode the payload.
    const parts = token.split('.');

    // Replace URL encoded characters with the expected base64 alternatives.
    parts[1] = parts[1].replace(/-/g, '+').replace(/_/g, '/');

    return parts.join('.');
  };

  useEffect(() => {
    if (window.Coral) {
      embed = window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL: embedUrl,
        events,
      });

      if (accessToken) {
        // Login the user if an access token exists.
        embed.login(base64UrlDecodeJWTPayload(accessToken));
        // Register the login in the state tree.
        dispatchLogin();
      }

      if (!accessToken && shouldPurgeUser) {
        // Log-out the user.
        embed.logout();
        // Clear the Coral branch of the state tree and prep it for re-authentication.
        dispatchLogout();
      }
    }
    return () => (embed ? embed.remove() : null);
  }, [
    loaded,
    accessToken,
    shouldPurgeUser,
  ]);

  return (
    <div id="coral_thread" />
  );
};

CoralEmbed.defaultProps = {
  events: () => {},
  accessToken: undefined,
};

CoralEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
  events: PropTypes.func,
  accessToken: PropTypes.string,
};

export default CoralEmbed;
