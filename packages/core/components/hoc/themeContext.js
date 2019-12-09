import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({});

ThemeContext.Provider.propTypes = {
  value: PropTypes.object.isRequired,
};

/** @component */
export default ThemeContext;
