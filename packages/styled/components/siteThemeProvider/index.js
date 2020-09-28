import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import get from 'lodash/get';

/**
 * Component for using the `styled-components` package's ThemeProvider.
 */
const SiteThemeProvider = (props) => {
  const {
    children,
    theme,
  } = props;

  const recursivelyBuildTheme = (branch, tree) => {
    const modifiedBranch = branch;

    Object.keys(branch).forEach((key) => {
      if ('object' === typeof branch[key]) {
        recursivelyBuildTheme(branch[key], tree);
      } else {
        let returnValue = branch[key];
        let defaultValue = returnValue;

        // Recursively look for the returned value in the theme provider until
        // the default is returned.
        do {
          defaultValue = returnValue;

          returnValue = get(
            tree,
            returnValue,
            defaultValue
          );
        } while (returnValue !== defaultValue);

        modifiedBranch[key] = returnValue;
      }
    });

    return modifiedBranch;
  };

  return (
    <ThemeProvider theme={recursivelyBuildTheme(theme, theme)}>
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
