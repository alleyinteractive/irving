import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import CssReset from '@irvingjs/styled/components/reset';
import { __ } from '@wordpress/i18n';
import * as defaultStyles from './themes/default';
import getTrackingService from '../../../core/services/trackingService';

const trackingService = getTrackingService();

/**
 * Top-level app component.
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
