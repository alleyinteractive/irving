import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import CssReset from '@irvingjs/styled/components/reset';
import { __ } from '@wordpress/i18n';
import * as defaultStyles from './themes/default';

/**
 * Top-level app component.
 */
const App = (props) => {
  const {
    IrvingApp,
  } = props;

  const {
    SkipLink,
  } = theme;

  return (
    <>
      <Helmet />
      <CssReset />
      <SkipLink href="#content">{'Skip to contents', 'irving-styled-components'}</SkipLink>
      <IrvingApp />
    </>
  );
};

App.propTypes = {
  IrvingApp: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

const themeMap = {
  default: defaultStyles,
};

export {
  App as Component,
  themeMap,
};

export default App;
