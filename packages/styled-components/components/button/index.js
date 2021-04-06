import React from 'react';
import PropTypes from 'prop-types';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
import * as defaultStyles from './themes/default';

/**
 * Render Button.
 */
const Button = (props) => {
  const {
    children,
    theme,
    onClick,
  } = props;
  const { ButtonWrapper } = theme;
  const standardProps = useStandardProps(props);

  return (
    <ButtonWrapper {...standardProps} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
};

Button.propTypes = {
  ...standardPropTypes,
  /**
   * Button OnClick function.
   */
  onClick: PropTypes.func,
};

const themeMap = {
  default: defaultStyles,
};

export {
  Button as Component,
  themeMap,
};

export default Button;
