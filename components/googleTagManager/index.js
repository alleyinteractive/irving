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
    return null;
  }

  /**
   * Check for gtm.start in dataLayer.
   */
  window.dataLayer = window.dataLayer || [];
  const started = window.dataLayer.filter((dataLayerObj) => (
    dataLayerObj['gtm.start']
  ));

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

  // useeffect hook with empty array every time that also calls the push zephr event function.
  // would do all the logic of firing the zp

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
