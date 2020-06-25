import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

/**
 * Site theme context provider.
 */
const SiteThemeProvider = (props) => {
  const {
    children,
    theme,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

SiteThemeProvider.defaultProps = {
  children: [],
  theme: {},
};

SiteThemeProvider.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.array,
  /**
   * Site theme.
   */
  theme: PropTypes.object,
};

export default SiteThemeProvider;
