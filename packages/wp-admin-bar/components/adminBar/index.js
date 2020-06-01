import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getRouteMeta from '@irvingjs/core/selectors/getRouteMeta';
import { withStyles } from 'critical-style-loader/lib';
import styles from './adminBar.css';

const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
const {
  API_ORIGIN,
  API_ROOT_URL,
} = env;

const AdminBar = () => {
  const iframeOrigin = API_ORIGIN ||
    API_ROOT_URL.replace('/wp-json/irving/v1', '');
  const {
    path,
  } = useSelector(getRouteMeta);
  const [hover, setHover] = useState(false);
  const [height, setHeight] = useState(0);

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
        src={`${iframeOrigin}${path}`}
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

export default withStyles(styles)(AdminBar);
