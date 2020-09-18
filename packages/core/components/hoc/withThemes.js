import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assignWith from 'lodash/fp/assignWith';
import getDisplayName from 'utils/getDisplayName';
import ThemeContext from 'components/hoc/themeContext';

/**
 * HoC for providing an object of themes for a component to use for styling
 *
 * @todo add tests for this once https://github.com/airbnb/enzyme/pull/1513 is merged
 *
 * @param {string} identifier String to identify this component. ThemeContext can provide themes for multiple components,
 *                             so the identifier is used to pull out the theme for just this component from context
 * @param {object} componentThemes All themes available for this component. Keys are the string identifying the theme,
 *                                 values are the contents of an imported stylesheet (localized cssmodules classnames)
 *
 * @param {bool} composes Should default classes be composed with (added to) theme classes or overridden by them?
 */
const withThemes = (
  identifier,
  componentThemes,
  composes = false
) => (WrappedComponent) => {
  const ThemePicker = (props) => {
    const contextThemes = useContext(ThemeContext);

    /**
     * Get the theme name.
     *
     * @param {object} contextThemes Theme key provided from context.
     * @return {string} Key/name for current theme.
     */
    const getThemeName = () => {
      const { themeName: propsThemeName } = props;
      const hasThemeFromContext = contextThemes &&
        Object.keys(contextThemes).length &&
        contextThemes[identifier];

      if (propsThemeName) {
        return propsThemeName;
      }

      if (hasThemeFromContext) {
        return contextThemes[identifier];
      }

      return 'default';
    };

    /**
     * Get the theme object.
     *
     * @param {object} contextThemes Theme key provided from context.
     * @return {object} Theme classes merged with defaults.
     */
    const getTheme = () => {
      const defaultTheme = componentThemes.default || {};
      const { theme: propsTheme } = props;
      const themeName = getThemeName();
      const theme = Object.keys(propsTheme).length ?
        propsTheme :
        componentThemes[themeName];

      // Should theme styles override or compose the defaults?
      if (composes) {
        return assignWith(
          (objValue, srcValue) => (
            classNames(srcValue, objValue)
          ),
          theme,
          defaultTheme
        );
      }

      return {
        ...defaultTheme,
        ...theme,
      };
    };

    return (
      <WrappedComponent
        {...props}
        theme={getTheme(contextThemes)}
        themeName={getThemeName(contextThemes)}
      />
    );
  };

  ThemePicker.propTypes = {
    themeName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    theme: PropTypes.object,
  };

  ThemePicker.defaultProps = {
    themeName: false,
    theme: {},
  };

  ThemePicker.displayName = getDisplayName('ThemePicker', WrappedComponent);

  return ThemePicker;
};

/** @component */
export default withThemes;
