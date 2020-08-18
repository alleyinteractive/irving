import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CoralEmbed = (props) => {
  const { embedUrl, events } = props;

  if (! embedUrl) {
    return null;
  }

  const loaded = useLoadScript(
    `${embedUrl}/assets/js/embed.js`,
    'coral'
  );

  useEffect(() => {
    if (window.Coral) {
      window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL: embedUrl,
        events,
      });
    }
  }, [loaded]);

  return (
    <div id="coral_thread" />
  );
};

CoralEmbed.defaultProps = {
  events: () => {},
};

CoralEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
  events: PropTypes.func,
};

export default CoralEmbed;
