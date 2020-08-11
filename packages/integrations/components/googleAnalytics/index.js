import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const GoogleAnalytics = (props) => {
  const { trackingId } = props;

  if (! trackingId) {
    return null;
  }

  return (
    <Helmet>
      {/* eslint-disable max-len */}
      <script>
        {`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '${trackingId}', 'auto');`}
      </script>
      {/* eslint-enable */}
    </Helmet>
  );
};

GoogleAnalytics.defaultProps = {
  trackingId: undefined,
};

GoogleAnalytics.propTypes = {
  /**
   * Your GA tracking ID, found in your GA account dashboard.
   */
  trackingId: PropTypes.string,
};

export default GoogleAnalytics;
