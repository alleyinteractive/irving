import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import useLoadScript from 'hooks/useLoadScript';
import isNode from 'utils/isNode';

const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
  } = props;

  if (! containerId) {
    return null;
  }

  /**
   * Load GTM script, but only once.
   */
  const loaded = useLoadScript(
    `https://www.googletagmanager.com/gtm.js?id=${containerId}`,
    'google-tag-manager'
  );

  /**
   * Effect for starting up the GTM dataLayer.
   */
  useEffect(() => {
    // gtm start function, invoked in useEffect so it doesn't fire on every render
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    return () => {};
  }, [loaded]);

  /**
   * Effect for pushing new data to the GTM dataLayer.
   */
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'irving.historyChange',
      ...dataLayer,
    });

    return () => {};
  }, [dataLayer]);

  return (
    <>
      <Helmet>
        {/* Initial SSR event. */}
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            if (${isNode()}) {
              var data = ${JSON.stringify(dataLayer)};
              data.event = 'irving.initialRender';
              window.dataLayer.push(data);
            }
          `}
        </script>
      </Helmet>
      <noscript>
        <iframe
          title="irving-gtm"
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
        />
      </noscript>
    </>
  );
};

GoogleTagManager.propTypes = {
  containerId: PropTypes.string.isRequired,
  dataLayer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array, // Empty objects turn to arrays in PHP :(
  ]).isRequired,
};

export default GoogleTagManager;
