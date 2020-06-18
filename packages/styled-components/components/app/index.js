import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

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
      <IrvingApp />
    </>
  );
};

App.propTypes = {
  IrvingApp: PropTypes.func.isRequired,
};

export default App;
