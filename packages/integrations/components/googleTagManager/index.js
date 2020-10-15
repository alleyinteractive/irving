import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from '@irvingjs/core/utils/isNode';
import getTrackingService from '@irvingjs/core/services/trackingService';
import serialize from 'serialize-javascript';

const trackingService = getTrackingService();

/**
 * Google Tag Manager integration.
 *
 * @todo Move data handling to new dedicated component or make this a generic 'tagManager' component.
 *
 * Event context is defined here because otherwise we can cause integrations to load when it's not needed.
 *
 * @tracking Fires when component is mounted.
 * - event          irving.componentLoaded
 * - eventComponent gtm
 * - eventContext   irving.integrationsManager
 *
 * @tracking Fires when component is updated.
 * - event irving.historyChange (plus gtm.start on first one)
 *
 */
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
   * Tracking prop types.
   */
  ...trackingService.trackingPropTypes,
};

export default trackingService.withTracking({
  event: 'irving.componentLoaded',
  eventComponent: 'gtm',
  eventContext: 'irving.integrationsManager',
}, { dispatchOnMount: true })(GoogleTagManager);
