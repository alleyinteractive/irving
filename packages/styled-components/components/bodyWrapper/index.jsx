/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import {
  Component as LoaderComponent,
  themeMap as loaderThemeMap,
} from '../loader';
import * as defaultStyles from './themes/default';

const Loader = withThemes(loaderThemeMap)(LoaderComponent);

const BodyWrapper = (props) => {
  const {
    children,
    theme,
    loadingProps,
  } = props;
  const standardProps = useStandardProps(props);
  const { Main } = theme;

  return (
    <Loader
      theme={theme}
      loadingProps={loadingProps}
    >
      <Main
        {...standardProps}
        id="content"
      >
        {children}
      </Main>
    </Loader>
  );
};

BodyWrapper.propTypes = {
  ...standardPropTypes,
  /**
   * Props passed to Loader component.
   */
  loadingProps: PropTypes.object,
};

BodyWrapper.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  loadingProps: {},
};

const themeMap = {
  default: defaultStyles,
};

export {
  BodyWrapper as Component,
  themeMap,
};

export default BodyWrapper;
