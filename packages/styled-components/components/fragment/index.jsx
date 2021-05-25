/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

/**
 * Render children in a React fragment or any other HTML tag.
 */
const Fragment = (props) => {
  const {
    children,
    style,
    theme,
  } = props;
  const { Element } = theme;
  const standardProps = useStandardProps(props);
  const { as } = standardProps;
  const useTag = (as || (Object.keys(style).length && !style.length));

  return (
    <>
      {useTag ? (
        <Element {...standardProps}>{children}</Element>
      ) : (
        children
      )}
    </>
  );
};

Fragment.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
};

Fragment.propTypes = {
  ...standardPropTypes,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Fragment as Component,
  themeMap,
};

export default Fragment;
