import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from '@irvingjs/core/utils/isNode';
import serialize from 'serialize-javascript';
import { actionSetContainerId } from '../../actions/gtmActions';
/**
 * Google Tag Manager integration.
 *
 * @todo Move data handling to new dedicated component.
 * @todo Make this a generic tag manager component.
 *
 */
const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
  } = props;

  if (!containerId) {
    return null;
  }

  const dispatch = useDispatch();
  dispatch(actionSetContainerId(containerId));

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
    if (started.length === 0) {
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
    }
  }, []);

  /**
   * Effect for pushing new data to the GTM dataLayer.
   */
  useEffect(() => {
    window.dataLayer.push({
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
              window.gtag = function () {
                window.dataLayer.push(arguments);
              };
              window.gtag('js', new Date());
              window.gtag('config', ${containerId});
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
  containerId: '',
  dataLayer: [],
};

GoogleTagManager.propTypes = {
  containerId: PropTypes.string,
  dataLayer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array, // Empty objects turn to arrays in PHP :(
  ]),
};

export default GoogleTagManager;
