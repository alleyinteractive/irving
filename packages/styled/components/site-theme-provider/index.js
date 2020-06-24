import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const SiteThemeProvider = (props) => {
  const {
    children,
    theme,
  } = props;

  console.log('This is my cool theme', theme);

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
