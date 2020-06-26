import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '@irvingjs/core/utils/getDisplayName';
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

    // If the value of a property in a styled components `style` property is
    // available in the styled component theme, use that value. This allows us
    // to do things like `color: theme.colors.black` and have it become
    // `color: #000000`.
    const themeContext = useContext(ThemeContext);
    const newProps = props;
    Object.keys(style).forEach((property) => {
      newProps.style[property] = get(
        themeContext,
        newProps.style[property],
        newProps.style[property]
      );
    });

    return (
      <WrappedComponent theme={theme} {...newProps} />
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
    style: PropTypes.oneOf([
      PropTypes.array,
      PropTypes.object,
    ]),
  };

  ThemedComponent.defaultProps = {
    themeName: 'default',
    style: {},
  };

  ThemedComponent.displayName = getDisplayName('withThemes', WrappedComponent);

  return ThemedComponent;
};

/** @component */
export default withThemes;
