import React, { useEffect } from 'react';
import PropTypes from 'propt-types';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CoralEmbed = (props) => {
  const { rootURL } = props;

  if (! rootURL) {
    return null;
  }

  const loaded = useLoadScript(
    `${rootURL}/assets/js/embed.js`,
    'coral'
  );

  useEffect(() => {
    if (window.Coral) {
      window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL,
      });
    }
  }, [loaded]);

  return (
    <div id="coral_thread" />
  );
};

CoralEmbed.propTypes = {
  rootURL: PropTypes.string.isRequired,
};

export default CoralEmbed;
