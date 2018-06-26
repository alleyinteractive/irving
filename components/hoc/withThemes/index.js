import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assignWith from 'lodash/fp/assignWith';
// import getDisplayName from 'utils/getDisplayName';
import ThemeContext from 'components/hoc/ThemeContext';

const withThemes = (
  identifier,
  themes,
  composes = false
) => (WrappedComponent) => {
  class ThemePicker extends Component {
    getTheme = (themes) => {
      if (!themes || !Object.keys(themes).length) {
        return {};
      }

      const { useTheme } = this.props;
      const defaultTheme = themes.default || {};
      let contextTheme = {};

      if (useTheme) {
        contextTheme = themes[useTheme];
      } else if (themes[identifier]) {
        contextTheme = themes[themes[identifier]];
      }

      // Should theme styles override or compose the defaults?
      if (composes) {
        return assignWith(
          (objValue, srcValue) => `${objValue} ${srcValue}`,
          contextTheme,
          defaultTheme
        );
      } else {
        return Object.assign({}, defaultTheme, contextTheme);
      }
    };

    render() {
      return (
        <ThemeContext.Consumer>
          {(themes) => (
            <WrappedComponent {...this.props} theme={this.getTheme(themes)} />
          )}
        </ThemeContext.Consumer>
      );
    }
  };

  ThemePicker.propTypes = {
    useTheme: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
  };

  ThemePicker.defaultProps = {
    useTheme: false,
  };

  // ThemePicker.displayName = getDisplayName('ThemePicker', WrappedComponent);

  return ThemePicker;
};

export default withThemes;
