import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/fp/assign';

const withThemes = (themeMap) => (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const {
      theme: propsTheme,
      themeName,
    } = props;
    const currentTheme = propsTheme && Object.keys(propsTheme).length
      ? propsTheme
      : themeMap[themeName] || {};
    const theme = assign(
      themeMap.default,
      currentTheme,
    );

    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <WrappedComponent
        {...props}
        theme={theme}
      />
    );
    /* eslint-enable */
  };

  ThemedComponent.propTypes = {
    /**
     * Prop indicating which theme to use.
     */
    themeName: PropTypes.oneOf(Object.keys(themeMap)),
    /**
     * Theme (styles) to apply to the component.
     */
    /* eslint-disable-next-line react/forbid-prop-types */
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
