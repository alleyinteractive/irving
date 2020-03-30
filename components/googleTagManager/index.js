import React, {
  useEffect,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from 'utils/isNode';
import { connect } from 'react-redux';
import { zephrDataLayerSelector } from 'selectors/zephrDataLayerSelector';

export const GTMContext = createContext({
  dataLayer: {},
  pushEvent: () => {},
});

const GoogleTagManager = (props) => {
  const {
    children,
    containerId,
    dataLayer,
    zephrDataLayer,
  } = props;

  // Define window dataLayer
  window.dataLayer = window.dataLayer || [];

  /**
   * Helper function passed by context to push events to Google Tag Manager.
   *
   * @param {string} eventName Name of the event.
   * @param {object} options Options to pass to push event.
   */
  const pushEvent = (eventName, options = {}) => {
    // Do not run if dataLayer has no values!
    const hasValues = Object.keys(dataLayer).filter((key) => dataLayer[key]);
    if (0 === hasValues.length) {
      return;
    }

    window.dataLayer.push({
      event: eventName,
      ...dataLayer,
      ...options,
    });
  };

  /**
   * Check for gtm.start in dataLayer.
   */
  const started = window.dataLayer.filter((dataLayerObj) => (
    dataLayerObj['gtm.start']
  ));

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

  /**
   * Effect for pushing Zephr-related events.
   */
  useEffect(() => {
    const { isLoading, dataLayer: zephrDataLayerResults } = zephrDataLayer;

    // Do not update if empty or loading.
    if (isLoading) {
      return;
    }

    const {
      loggedIn,
      hasDigitalAccess,
    } = zephrDataLayerResults;

    // Push values to dataLayer.
    if (loggedIn && hasDigitalAccess) {
      pushEvent('zephr.subscriberView', zephrDataLayerResults);
    } else if (loggedIn) {
      pushEvent('zephr.userView', zephrDataLayerResults);
    } else {
      pushEvent('zephr.anonymousView', zephrDataLayerResults);
    }
  }, [zephrDataLayer]);

  if (! containerId) {
    return children;
  }

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
  zephrDataLayer: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    dataLayer: PropTypes.shape({
      loggedIn: PropTypes.bool,
      UserId: PropTypes.string,
      remainingCredits: PropTypes.number,
      usedCredits: PropTypes.number,
      hasDigitalAccess: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  zephrDataLayer: zephrDataLayerSelector(state),
});

export default connect(mapStateToProps)(GoogleTagManager);
