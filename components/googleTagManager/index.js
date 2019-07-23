import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const GoogleTagManager = (props) => {
  const { containerId } = props;

  if (! containerId) {
    return null;
  }

  return (
    <Fragment>
      <Helmet>
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`}
        </script>
      </Helmet>
      <noscript>
        <iframe
          title="fortune-gtm"
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
        />
      </noscript>
    </Fragment>
  );
};

GoogleTagManager.propTypes = {
  /**
   * Your GTM tracking ID, found in your GTM account dashboard.
   */
  containerId: PropTypes.string.isRequired,
};

export default GoogleTagManager;
