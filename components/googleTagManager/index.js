import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import isNode from 'utils/isNode';
import { getZephrDataLayer } from 'selectors/zephrSelector';

const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
    zephrDataLayer,
  } = props;

  const [
    lastZephrDataLayer,
    setLastZephrDataLayer,
  ] = useState(zephrDataLayer);

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

  /**
   * Effect for pushing Zephr-related data into the GTM dataLayer.
   * This needs to be in a separate function from the dataLayer effect as it
   * will call the event twice, once when the history changes and once when the
   * Zephr dataLayer updates are received (upon history change).
   */
  useEffect(() => {
    // Do not update if the states are identical.
    if (
      zephrDataLayer === lastZephrDataLayer
    ) {
      return;
    }

    window.dataLayer.push({
      event: 'zephr.historyChange',
      ...zephrDataLayer,
    });
    setLastZephrDataLayer(zephrDataLayer);
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
    </>
  );
};

GoogleTagManager.propTypes = {
  containerId: PropTypes.string.isRequired,
  dataLayer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array, // Empty objects turn to arrays in PHP :(
  ]).isRequired,
  zephrDataLayer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  zephrDataLayer: getZephrDataLayer(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(GoogleTagManager);
