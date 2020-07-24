import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import getDisplayName from '@irvingjs/core/utils/getDisplayName';
import assign from 'lodash/fp/assign';
import get from 'lodash/get';
import { ThemeContext } from 'styled-components';

const withThemes = (themeMap) => (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const { themeName, style } = props;
    const theme = assign(
      themeMap.default,
      themeMap[themeName]
    );

    // Using the `styled-components` ThemeContext, attempt to use dynamic
    // values in CSS properties.
    const themeContext = useContext(ThemeContext);
    const newStyle = Object.keys(style)
      .reduce((acc, property) => {
        /**
         * For every value passed in the style prop, check if the value is
         * actually a path to our ThemeContext.
         *
         * Example,
         *   Match:
         *    {color: theme.colors.black} => {color: #000;}
         *
         *   No Match:
         *     {color: #000} => {color: #000;}
         */
        const themeStyle = get(
          themeContext,
          style[property],
          style[property]
        );

        return {
          ...acc,
          [property]: themeStyle,
        };
      }, style);

    return (
      <WrappedComponent theme={theme} {...props} style={newStyle} />
    );
  };

  ThemedComponent.propTypes = {
    /**
     * Prop indicating which theme to use.
     */
    themeName: PropTypes.oneOf(Object.keys(themeMap)),
    /**
     * CSS style.
     */
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  ThemedComponent.defaultProps = {
    themeName: 'default',
    style: {},
  };

  // ThemedComponent.displayName = getDisplayName('withThemes', WrappedComponent);

  return ThemedComponent;
};

/** @component */
export default withThemes;
