import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import CssReset from 'styles/reset';

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
  IrvingApp: PropTypes.func.isRequired,
};

export default App;
