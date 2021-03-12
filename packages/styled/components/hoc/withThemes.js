import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/fp/assign';

const withThemes = (themeMap) => (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const {
      theme: propsTheme,
      themeName,
    } = props;
    const currentTheme = propsTheme && Object.keys(propsTheme).length ?
      propsTheme :
      themeMap[themeName] || {};
    const theme = assign(
      themeMap.default,
      currentTheme
    );

    return (
      <WrappedComponent
        {...props}
        theme={theme}
      />
    );
  };

  ThemedComponent.propTypes = {
    /**
     * Prop indicating which theme to use.
     */
    themeName: PropTypes.oneOf(Object.keys(themeMap)),
    /**
     * Theme (styles) to apply to the component.
     */
    theme: PropTypes.object,
  };

  ThemedComponent.defaultProps = {
    themeName: 'default',
    theme: {},
  };

  return ThemedComponent;
};

/** @component */
export default withThemes;
