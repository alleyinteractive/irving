import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({});

ThemeContext.Provider.propTypes = {
  value: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/** @component */
export default ThemeContext;
