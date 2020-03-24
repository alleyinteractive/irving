import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import isNode from 'utils/isNode';
import { connect } from 'react-redux';
import { getZephrDataLayerSelector } from 'selectors/zephrDataLayerSelector';

const GoogleTagManager = (props) => {
  const {
    containerId,
    dataLayer,
    zephrDataLayer,
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
   * Effect for pushing Zephr-related events.
   */
  useEffect(() => {
    const { isLoading, dataLayer: zephrDataLayerResults } = zephrDataLayer;

    // Do not update if empty or loading.
    if (
      isLoading ||
      0 === Object.keys(zephrDataLayerResults)
    ) {
      return;
    }

    // Push values to dataLayer.
    window.dataLayer.push({
      event: 'zephr.meter',
      ...zephrDataLayerResults,
    });

    // Need to refactor these so they are pushed on actions and not within the component.

    // const {
    //   loggedIn,
    //   UserId,
    //   remainingCredits,
    //   usedCredits,
    //   hasDigitalAccess,
    // } = zephrDataLayerResults;

    // // Push events based on meter rules.
    // window.datalayer.push({
    //   event: 'zephr.meter',
    //   category: 'meter',
    //   action: 'view',
    //   label: `00${usedCredits}`,
    // });
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
  zephrDataLayer: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    dataLayer: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
      UserId: PropTypes.string.isRequired,
      remainingCredits: PropTypes.string.isRequired,
      usedCredits: PropTypes.string.isRequired,
      hasDigitalAccess: PropTypes.bool.isRequired,
    }).isRequired,
  }),
};

const mapStateToProps = (state) => ({
  zephrDataLayer: getZephrDataLayerSelector(state),
});

export default connect(mapStateToProps)(GoogleTagManager);
