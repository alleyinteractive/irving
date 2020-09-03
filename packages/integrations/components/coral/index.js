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
  loginStatusSelector,
} from '../../selectors/coralSelector';

const CoralEmbed = ({
  accessToken,
  embedUrl,
  events,
}) => {
  if (! embedUrl) {
    return null;
  }

  const loaded = useLoadScript(
    `${embedUrl}/assets/js/embed.js`,
    'coral'
  );

  const dispatch = useDispatch();
  // Define a function that will update the store when the user logs out.
  const dispatchLogout = useCallback(
    () => dispatch(actionReceiveCoralLogout()),
    [dispatch]
  );
  // Define a function that will update the store when a user logs in.
  const dispatchLogin = useCallback(
    () => dispatch(actionReceiveCoralLogin()),
    [dispatch]
  );

  // Define whether or not the user is set to be purged. This must be defined
  // outside of the `useEffect` call in order to align with the rules of hooks.
  // https://reactjs.org/docs/hooks-rules.html
  const shouldPurgeUser = useSelector(purgeSelector);
  // Define an identifer for whether or not the user is currently logged into Coral.
  const isAuthenticated = useSelector(loginStatusSelector);

  useEffect(() => {
    if (window.Coral) {
      const embed = window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL: embedUrl,
        events,
      });

      if (accessToken && ! isAuthenticated) {
        // Login the user if an access token exists.
        embed.login(accessToken);
        // Register the login in the state tree.
        dispatchLogin();
      }

      if (! accessToken && shouldPurgeUser) {
        // Log-out the user.
        embed.logout();
        // Clear the Coral branch of the state tree and prep it for re-authentication.
        dispatchLogout();
      }
    }
  }, [
    loaded,
    accessToken,
    isAuthenticated,
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
