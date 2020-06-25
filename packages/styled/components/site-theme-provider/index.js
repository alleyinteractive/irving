import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

/**
 * Site theme context provider.
 */
const SiteThemeProvider = (props) => {
  const {
    children,
    themeTest,
  } = props;

  return (
    <ThemeProvider theme={themeTest}>
      {children}
    </ThemeProvider>
  );
};

SiteThemeProvider.defaultProps = {
  children: [],
  themeTest: {},
};

SiteThemeProvider.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.array,
  /**
   * Site theme.
   */
  themeTest: PropTypes.object,
};

export default SiteThemeProvider;
