import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './adminBar.css';

const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
const {
  API_ORIGIN,
  API_ROOT_URL,
} = env;

const AdminBar = (props) => {
  const {
    iframeSrc,
  } = props;
  const iframeOrigin = API_ORIGIN ||
    API_ROOT_URL.replace('/wp-json/irving/v1', '');
  const [hover, setHover] = useState(false);
  const [height, setHeight] = useState(0);

  if (! iframeSrc) {
    return null;
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== iframeOrigin) {
        return;
      }
      if ('undefined' !== typeof event.data.hovered) {
        setHover(event.data.hovered);
      }
      if ('undefined' !== typeof event.data.height) {
        setHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  return (
    <>
      <iframe
        title="Admin Bar Iframe"
        src={iframeSrc}
        className={styles.iframe}
        style={{
          height: hover ? '100%' : `${height}px`,
        }}
      />
      <div
        className={styles.spacer}
        style={{
          height: `${height}px`,
        }}
      />
    </>
  );
};

AdminBar.defaultProps = {
  iframeSrc: '',
};

AdminBar.propTypes = {
  /**
   * Source URL for the admin bar iframe.
   */
  iframeSrc: PropTypes.string,
};

export default withStyles(styles)(AdminBar);
