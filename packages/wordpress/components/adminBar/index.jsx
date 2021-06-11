import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/fp/get';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import getEnv from '@irvingjs/core/config/irving/getEnv';
import styles from './adminBar.css';

const AdminBar = (props) => {
  const {
    children,
    cookieDomain,
    iframeSrc,
  } = props;
  const hostname = useSelector((state) => get('route.hostname', state));
  const { API_ORIGIN, API_ROOT_URL } = getEnv(hostname);
  const iframeOrigin = API_ORIGIN
    || API_ROOT_URL.replace('/wp-json/irving/v1', '');
  const [hover, setHover] = useState(false);
  const [height, setHeight] = useState(0);

  const cookies = new Cookies();

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin !== iframeOrigin
        && !iframeOrigin.includes(event.origin)
      ) {
        return;
      }

      if (typeof event.data.hovered !== 'undefined') {
        setHover(event.data.hovered);
      }

      if (typeof event.data.height !== 'undefined') {
        setHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  });

  // We don't have a valid iframe, but we do have children and a cookie domain.
  if (!iframeSrc && children && cookieDomain.length !== 0) {
    // Create a new `irvingResetToken` cookie, which will trigger a new token
    // to be created on the backend.
    cookies.set(
      'irvingResetToken',
      'true',
      {
        domain: cookieDomain,
        path: '/',
      },
    );

    return children;
  }

  if (!iframeSrc) {
    return null;
  }

  return (
    <>
      <aside
        className={styles.spacer}
        id="wordpress-admin-bar__wrapper"
        style={{
          height: `${height}px`,
        }}
      >
        <iframe
          title="Admin Bar Iframe"
          src={iframeSrc}
          className={styles.iframe}
          style={{
            height: hover ? '100%' : `${height}px`,
          }}
        />
      </aside>
    </>
  );
};

AdminBar.defaultProps = {
  cookieDomain: '',
  iframeSrc: '',
};

AdminBar.propTypes = {
  /**
   * Custom children.
   */
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Domain to create new cookies.
   */
  cookieDomain: PropTypes.string,
  /**
   * Source URL for the admin bar iframe.
   */
  iframeSrc: PropTypes.string,
};

export default AdminBar;
