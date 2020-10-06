import React from 'react';
import Loader from 'components/loader';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

const BodyWrapper = (props) => {
  const {
    children,
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const { Main } = theme;

  return (
    <Loader>
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
};

BodyWrapper.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
};

const themeMap = {
  default: defaultStyles,
};

export {
  BodyWrapper as Component,
  themeMap,
};

export default BodyWrapper;
