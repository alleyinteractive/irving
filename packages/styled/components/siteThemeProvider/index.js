import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

/**
 * Component for using the `styled-components` package's ThemeProvider.
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

SiteThemeProvider.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.array.isRequired,
  /**
   * Children of the component.
   */
  theme: PropTypes.object.isRequired,
};

export default SiteThemeProvider;
