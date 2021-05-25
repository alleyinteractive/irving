import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { recursivelyBuildObjectTree } from '../../utils/siteTheme';

/**
 * Component for using the `styled-components` package's ThemeProvider.
 */
const SiteThemeProvider = (props) => {
  const {
    children,
    theme,
  } = props;

  return (
    <ThemeProvider theme={recursivelyBuildObjectTree(theme, theme)}>
      {children}
    </ThemeProvider>
  );
};

SiteThemeProvider.propTypes = {
  /**
   * Children of the component.
   */
  /* eslint-disable-next-line react/forbid-prop-types */
  children: PropTypes.array.isRequired,
  /**
   * Children of the component.
   */
  /* eslint-disable-next-line react/forbid-prop-types */
  theme: PropTypes.object.isRequired,
};

export default SiteThemeProvider;
