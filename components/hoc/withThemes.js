import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assignWith from 'lodash/fp/assignWith';
import getDisplayName from 'utils/getDisplayName';
import ThemeContext from 'components/hoc/ThemeContext';


/**
 * HoC for providing an object of themes for a component to use for styling
 *
 * @todo add tests for this once https://github.com/airbnb/enzyme/pull/1513 is merged
 */
const withThemes = (
  identifier,
  componentThemes,
  composes = false
) => (WrappedComponent) => {
  class ThemePicker extends Component {
    getTheme = (contextThemes) => {
      if (! contextThemes || ! Object.keys(contextThemes).length) {
        return {};
      }

      const { useTheme } = this.props;
      const defaultTheme = componentThemes.default || {};
      let theme = {};

      if (useTheme) {
        theme = componentThemes[useTheme];
      } else if (contextThemes[identifier]) {
        theme = componentThemes[contextThemes[identifier]];
      }

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

    render() {
      return (
        <ThemeContext.Consumer>
          {(themes) => (
            <WrappedComponent
              {...this.props}
              theme={this.getTheme(themes)}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  ThemePicker.propTypes = {
    useTheme: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  ThemePicker.defaultProps = {
    useTheme: false,
  };

  ThemePicker.displayName = getDisplayName('ThemePicker', WrappedComponent);

  return ThemePicker;
};

export default withThemes;
