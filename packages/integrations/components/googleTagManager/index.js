import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from '@irvingjs/core/utils/isNode';

const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
  } = props;

  if (! containerId) {
    return null;
  }

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
        {/* eslint-disable max-len */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${containerId}');
          `}
        </script>
        {/* Initial SSR event. */}
        <script>
          {`
            if (${isNode()}) {
              var data = ${JSON.stringify(dataLayer)};
              data.event = 'irving.initialRender';
              window.dataLayer.push(data);
            }
          `}
        </script>
        {/* eslint-enable */}
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
