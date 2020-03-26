import React, {
  useEffect,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from 'utils/isNode';

export const GTMContext = createContext({
  dataLayer: {},
  pushEvent: () => {},
});

const GoogleTagManager = (props) => {
  const {
    children,
    containerId,
    dataLayer,
  } = props;

  if (! containerId) {
    return children;
  }

  /**
   * Check for gtm.start in dataLayer.
   */
  window.dataLayer = window.dataLayer || [];
  const started = window.dataLayer.filter((dataLayerObj) => (
    dataLayerObj['gtm.start']
  ));

  /**
   * Helper function passed by context to push events to Google Tag Manager.
   *
   * @param {string} eventName Name of the event.
   * @param {object} options Options to pass to push event.
   */
  const pushEvent = (eventName, options = {}) => {
    window.dataLayer.push({
      event: eventName,
      ...dataLayer,
      ...options,
    });
  };

  /**
   * Effect for starting the GTM dataLayer.
   */
  useEffect(() => {
    if (0 === started.length) {
      pushEvent('gtm.js', { 'gtm.start': new Date().getTime() });
    }
  }, []);

  /**
   * Effect for pushing new data to the GTM dataLayer.
   */
  useEffect(() => {
    pushEvent('irving.historyChange');
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
      <GTMContext.Provider value={{ dataLayer, pushEvent }}>
        {children}
      </GTMContext.Provider>
    </>
  );
};

GoogleTagManager.propTypes = {
  containerId: PropTypes.string.isRequired,
  dataLayer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array, // Empty objects turn to arrays in PHP :(
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default GoogleTagManager;
