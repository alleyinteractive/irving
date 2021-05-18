import React from 'react';
import PropTypes from 'prop-types';
import useLoading from '@irvingjs/core/hooks/useLoading';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import DefaultLoading from './defaultLoading';
import * as defaultStyles from './themes/default';

const Loader = (props) => {
  const {
    loadingProps = {},
    LoadingComponent = DefaultLoading,
    children,
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    Wrapper,
  } = theme;
  const loading = useLoading();

  return (
    <Wrapper data-testid="wrapper">
      {loading ? (
        <LoadingComponent
          {...standardProps}
          {...loadingProps}
          theme={theme}
        />
      ) : (
        children
      )}
    </Wrapper>
  );
};

Loader.propTypes = {
  ...standardPropTypes,
  /**
   * Name of the component
   */
  componentName: PropTypes.string,
  /**
   * Props passed to defaultLoading component.
   */
  loadingProps: PropTypes.object,
  /**
   * Loading indicator component.
   */
  LoadingComponent: PropTypes.func,
};

Loader.defaultProps = {
  ...getStandardDefaultProps(),
  // this component is sometimes used independent of the component map,
  // so we're making sure component name classes still get added.
  componentName: 'irving/loader',
  theme: defaultStyles,
  loadingProps: {},
  LoadingComponent: DefaultLoading,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Loader as Component,
  themeMap,
};

export default Loader;
