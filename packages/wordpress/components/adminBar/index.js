import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/fp/get';
import PropTypes from 'prop-types';
import getEnv from '@irvingjs/core/config/irving/getEnv';
import styles from './adminBar.css';

const AdminBar = (props) => {
  const {
    iframeSrc,
  } = props;
  const hostname = useSelector((state) => get('route.hostname', state));
  const { API_ORIGIN, API_ROOT_URL } = getEnv(hostname);
  const iframeOrigin = API_ORIGIN ||
    API_ROOT_URL.replace('/wp-json/irving/v1', '');
  const [hover, setHover] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin !== iframeOrigin &&
        ! iframeOrigin.includes(event.origin)
      ) {
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

  if (! iframeSrc) {
    return null;
  }

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

export default AdminBar;
