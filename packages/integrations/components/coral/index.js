import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CoralEmbed = ({ embedUrl, events, ssoToken }) => {
  if (! embedUrl) {
    return null;
  }

  const loaded = useLoadScript(
    `${embedUrl}/assets/js/embed.js`,
    'coral'
  );

  useEffect(() => {
    if (window.Coral) {
      const embed = window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL: embedUrl,
        events,
      });

      if (ssoToken) {
        embed.login(ssoToken);
      }
    }
  }, [loaded, ssoToken]);

  return (
    <div id="coral_thread" />
  );
};

CoralEmbed.defaultProps = {
  events: () => {},
  ssoToken: undefined,
};

CoralEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
  events: PropTypes.func,
  ssoToken: PropTypes.oneOfType([PropTypes.string, undefined]),
};

export default CoralEmbed;
