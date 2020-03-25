import React, {
  useEffect,
  createContext,
  useState,
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

  const [hasZephrPushed, setHasZephrPushed] = useState(false);

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

  /**
   * Effect for pushing Zephr-related events.
   */
  useEffect(() => {
    if (hasZephrPushed) {
      return;
    }

    const { isLoading, dataLayer: zephrDataLayerResults } = zephrDataLayer;

    // Do not update if empty or loading.
    if (false !== isLoading || ! zephrDataLayerResults) {
      return;
    }

    // Push values to dataLayer.
    pushEvent('zephr.historyChange', zephrDataLayerResults);
    setHasZephrPushed(true);
  }, [zephrDataLayer]);

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
      loggedIn: PropTypes.bool.isRequired,
      UserId: PropTypes.string.isRequired,
      remainingCredits: PropTypes.string.isRequired,
      usedCredits: PropTypes.string.isRequired,
      hasDigitalAccess: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  zephrDataLayer: zephrDataLayerSelector(state),
});

export default connect(mapStateToProps)(GoogleTagManager);
