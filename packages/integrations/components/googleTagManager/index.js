import React, { useEffect } from 'react';
import track, { TrackingPropType } from 'react-tracking';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from '@irvingjs/core/utils/isNode';
import serialize from 'serialize-javascript';

const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
    tracking,
  } = props;

  if (! containerId) {
    return null;
  }

  /**
   * Check for gtm.start in dataLayer.
   */
  window.dataLayer = window.dataLayer || [];
  const started = window.dataLayer.filter((dataLayerObj) => (
    dataLayerObj['gtm.start']
  ));

  /**
   * Effect for starting the GTM dataLayer.
   */
  useEffect(() => {
    if (0 === started.length) {
      tracking.trackEvent({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
    }
  }, []);

  /**
   * Effect for pushing new data to the GTM dataLayer.
   */
  useEffect(() => {
    tracking.trackEvent({
      event: 'irving.historyChange',
      ...dataLayer,
    });
    return () => {};
  }, [dataLayer]);

  return (
    <>
      <Helmet>
        <script src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`} async />
        {/* Initial SSR event. */}
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            if (${isNode()}) {
              var data = ${serialize(dataLayer, { json: true })};
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

GoogleTagManager.defaultProps = {
  dataLayer: [],
};

GoogleTagManager.propTypes = {
  containerId: PropTypes.string.isRequired,
  dataLayer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array, // Empty objects turn to arrays in PHP :(
  ]),
  /**
   * React tracking.
   */
  tracking: TrackingPropType, // eslint-disable-line react/require-default-props
};

export default track({
  eventComponent: 'gtm',
})(GoogleTagManager);
