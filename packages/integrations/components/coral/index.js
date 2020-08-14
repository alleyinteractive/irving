import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CoralEmbed = (props) => {
  const { embedUrl } = props;

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
      });
    }
  }, [loaded]);

  return (
    <div id="coral_thread" />
  );
};

CoralEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
};

export default CoralEmbed;
