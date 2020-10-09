import React, { useContext } from 'react';
import track, { useTracking } from 'react-tracking';
import AnalyticsContext from './analyticsContext';

/**
 * HoC for providing react-tracking interface to all components
 */
const withAnalytics = (WrappedComponent) => class extends React.Component {

  render() {
    const contextAnalytics = useContext(AnalyticsContext);
    return <WrappedComponent
      tracking={}
      {...this.props}
    />;
  }
};

/** @component */
export default withAnalytics;
