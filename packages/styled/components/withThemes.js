import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from '@irvingjs/core/utils/getDisplayName';
import assign from 'lodash/fp/assign';

const withThemes = (themeMap) => (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const { themeName } = props;
    const theme = assign(
      themeMap.default,
      themeMap[themeName]
    );

    return (
      <WrappedComponent theme={theme} {...props} />
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

  ThemedComponent.displayName = getDisplayName('withThemes', WrappedComponent);

  return ThemedComponent;
};

/** @component */
export default withThemes;
