import React from 'react';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  standardDefaultProps,
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
  const useTag = (
    as ||
    (! as && Object.keys(style).length && ! style.length)
  );

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
  ...standardDefaultProps,
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
