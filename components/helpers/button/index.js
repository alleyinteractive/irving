import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import styles from './button.css';

const Button = (props) => {
  const {
    link,
    type,
    buttonStyle,
    children,
    className,
    onClick,
  } = props;
  const Component = ! link ? 'button' : Link;
  const buttonType = link ? null : type;
  const destination = link || null;

  return (
    <Component
      to={destination}
      type={buttonType}
      className={classNames(
        className,
        styles.wrapper,
        styles[buttonStyle]
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  /**
   * Where should this button link to?
   */
  link: PropTypes.string,
  /**
   * Type attribute to use for this component.
   */
  type: PropTypes.string,
  /**
   * Style to apply to this button. Corresponds to a className in your stylesheet.
   */
  buttonStyle: PropTypes.string.isRequired,
  /**
   * Contents of button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classname(s) to apply to this button.
   */
  className: PropTypes.string,
  /**
   * Add an onClick handler to this button.
   */
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
};

Button.defaultProps = {
  link: '',
  type: 'button',
  className: '',
  onClick: null,
};

export default withStyles(styles)(Button);
