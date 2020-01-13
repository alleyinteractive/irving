import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const Brightcove = ({
  accountId,
  playerId,
  videoId,
  autoplay,
  width,
  height,
}) => {
  const newHeight = ('100%' === height) ? '360px' : height;
  const iframeSrc = `https://players.brightcove.net/${accountId}/${playerId}_default/index.html?videoId=${videoId}&${autoplay}`;
  const styling = {
    width,
    height: newHeight,
  };
  return (
    <iframe
      src={iframeSrc}
      allowFullScreen=""
      title={__('Brightcove Video', 'mittr')}
      style={
        styling
      }
    />
  );
};

Brightcove.defaultProps = {
  autoplay: '',
  width: '100%',
  height: '360px',
};

Brightcove.propTypes = {
  accountId: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  autoplay: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Brightcove;
