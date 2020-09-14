import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import CssReset from '@irvingjs/styled/components/reset';

/**
 * Top-level app component.
 */
const App = (props) => {
  const {
    IrvingApp,
  } = props;

  return (
    <>
      <Helmet />
      <CssReset />
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

export default App;
