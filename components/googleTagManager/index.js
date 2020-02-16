import React, {
  Fragment,
  createContext,
  useEffect,
} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import useLoadScript from 'hooks/useLoadScript';

export const GTMContext = createContext({
  loaded: false,
  containerId: null,
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
   * Effect for pushing new data to the GTM dataLayer.
   */
  useEffect(() => {
    window.dataLayer.push({
      event: 'mittr.historyChange',
      ...dataLayer,
    });
  }, [dataLayer]);

  /**
   * Is GTM loaded?
   */
  const loaded = useLoadScript(
    `https://www.googletagmanager.com/gtm.js?id=${containerId}`,
    'google-tag-manager'
  );

  return (
    <Fragment>
      <Helmet>
        <script>
          {`(function(w, l){
            w[l]=w[l]||[];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event:'gtm.js'
            });
          })(window, 'dataLayer');`}
        </script>
      </Helmet>
      <noscript>
        <iframe
          title="mittr-gtm"
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
        />
      </noscript>
      <GTMContext.Provider
        value={{
          loaded,
          containerId,
          dataLayer,
        }}
      >
        {children}
      </GTMContext.Provider>
    </Fragment>
  );
};

GoogleTagManager.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  containerId: PropTypes.string.isRequired,
  dataLayer: PropTypes.shape({
    contentType: PropTypes.string,
    contentId: PropTypes.string,
    channel: PropTypes.string,
    tags: PropTypes.array,
    headline: PropTypes.string,
  }).isRequired,
};

export default GoogleTagManager;
