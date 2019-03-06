import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assignWith from 'lodash/fp/assignWith';
import getDisplayName from 'utils/getDisplayName';
import ThemeContext from 'components/hoc/themeContext';

/**
 * HoC for providing an object of themes for a component to use for styling
 *
 * @todo add tests for this once https://github.com/airbnb/enzyme/pull/1513 is merged
 *
 * @param {string} indentifier String to identify this component. ThemeContext can provide themes for multiple components,
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
  class ThemePicker extends Component {
    /**
     * Get the theme object.
     *
     * @param {object} contextThemes Theme key provided from context.
     * @return {object} Theme classes merged with defaults.
     */
    getTheme = (contextThemes) => {
      const defaultTheme = componentThemes.default || {};
      const themeName = this.getThemeName(contextThemes);
      const theme = componentThemes[themeName];

      // Should theme styles override or compose the defaults?
      if (composes) {
        return assignWith(
          (objValue, srcValue) => `${objValue} ${srcValue}`,
          theme,
          defaultTheme
        );
      }

      return Object.assign({}, defaultTheme, theme);
    };

    /**
     * Get the theme name.
     *
     * @param {object} contextThemes Theme key provided from context.
     * @return {string} Key/name for current theme.
     */
    getThemeName = (contextThemes) => {
      const {
        // This is included for backwards compatibility.
        theme: propsTheme,
        themeName: propsThemeName,
      } = this.props;
      const hasThemeFromContext = contextThemes &&
        Object.keys(contextThemes).length &&
        contextThemes[identifier];
      let themeName = 'default';

      if (propsThemeName || propsTheme) {
        themeName = propsThemeName || propsTheme;
      } else if (hasThemeFromContext) {
        themeName = contextThemes[identifier];
      }

      return themeName;
    }

    render() {
      return (
        <ThemeContext.Consumer>
          {(themes) => (
            <WrappedComponent
              {...this.props}
              theme={this.getTheme(themes)}
              themeName={this.getThemeName(themes)}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  ThemePicker.propTypes = {
    themeName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    theme: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  ThemePicker.defaultProps = {
    themeName: false,
    theme: false,
  };

  ThemePicker.displayName = getDisplayName('ThemePicker', WrappedComponent);

  return ThemePicker;
};

export default withThemes;
