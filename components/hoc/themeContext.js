import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({});

ThemeContext.Provider.propTypes = {
  value: PropTypes.object.isRequired,
};

export default ThemeContext;
