import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

// Wait for the recaptcha object to become available.
const lazyLoadRecaptcha = new Promise((resolve) => {
  const interval = setInterval(() => {
    if (
      'undefined' !== typeof window &&
      'undefined' !== typeof window.grecaptcha
    ) {
      clearInterval(interval);

      resolve(window.grecaptcha);
    }
  }, 1000);
});

const LazyRecaptcha = ({
  className,
  sitekey,
  theme,
  type,
  size,
  tabindex,
  hl,
  badge,
  verifyCallback,
  expiredCallback,
  onloadCallback,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);

  const renderCaptcha = () => {
    lazyLoadRecaptcha.then((grecaptcha) => {
      grecaptcha.render(containerRef.current, {
        sitekey,
        theme,
        type,
        size,
        tabindex,
        hl,
        badge,
        callback: verifyCallback,
        'expired-callback': expiredCallback,
      });

      if (onloadCallback) {
        onloadCallback();
      }

      setHasLoaded(true);
    });
  };

  useEffect(() => {
    if (false === hasLoaded) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      document.body.appendChild(script);

      renderCaptcha();
    }
  });

  return (
    <div
      key="recaptcha"
      id={`captcha${hasLoaded ? '-loaded' : '-not-loaded'}`}
      className={className}
      ref={containerRef}
    />
  );
};

LazyRecaptcha.propTypes = {
  className: PropTypes.string.isRequired,
  onloadCallback: PropTypes.func,
  verifyCallback: PropTypes.func,
  expiredCallback: PropTypes.func,
  sitekey: PropTypes.string.isRequired,
  theme: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  tabindex: PropTypes.string,
  hl: PropTypes.string,
  badge: PropTypes.string,
};

LazyRecaptcha.defaultProps = {
  onloadCallback: undefined,
  verifyCallback: undefined,
  expiredCallback: undefined,
  theme: 'light',
  type: 'checkbox',
  size: 'normal',
  tabindex: '0',
  hl: 'en',
  badge: 'bottomright',
};

export default LazyRecaptcha;
