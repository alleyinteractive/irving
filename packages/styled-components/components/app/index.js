import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import CssReset from '@irvingjs/styled/components/reset';
import getTrackingService from '@irvingjs/core/services/trackingService';
import { __ } from '@wordpress/i18n';
import * as defaultStyles from './themes/default';

const trackingService = getTrackingService();

/**
 * Top-level app component.

 * @tracking Fires when component is mounted.
 * - event        irving.componentLoaded
 * - eventContext irving.styledComponents
 *
 */
const App = (props) => {
  const {
    IrvingApp,
    theme,
  } = props;

  const {
    SkipLink,
  } = theme;

  return (
    <>
      <Helmet />
      <CssReset />
      <SkipLink href="#content">
        {__('Skip to contents', 'irving-styled-components')}
      </SkipLink>
      <IrvingApp />
    </>
  );
};

App.defaultProps = {
  theme: defaultStyles,
};

App.propTypes = {
  IrvingApp: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  theme: PropTypes.object,
  ...trackingService.trackingPropTypes,
};

const themeMap = {
  default: defaultStyles,
};

export {
  App as Component,
  themeMap,
};

export default trackingService.withTracking({
  event: 'irving.componentLoaded',
  eventContext: 'irving.styledComponents',
}, { dispatchOnMount: true })(App);
