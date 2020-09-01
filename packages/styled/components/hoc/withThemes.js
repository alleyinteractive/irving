import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/fp/assign';

const withThemes = (themeMap) => (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const { themeName } = props;
    const theme = assign(
      themeMap.default,
      themeMap[themeName]
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
  };

  ThemedComponent.defaultProps = {
    themeName: 'default',
  };

  return ThemedComponent;
};

/** @component */
export default withThemes;
