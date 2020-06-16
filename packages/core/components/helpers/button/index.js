import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';

import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './button.css';

const Button = (props) => {
  const {
    link,
    type,
    buttonStyle,
    children,
    className,
    onClick,
    theme,
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
        theme.wrapper,
        theme[buttonStyle]
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
  buttonStyle: PropTypes.string,
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
  /**
   * Theme for the button.
   */
  theme: PropTypes.object.isRequired,
};

Button.defaultProps = {
  buttonStyle: '',
  link: '',
  type: 'button',
  className: '',
  onClick: null,
};

const wrapWithThemes = withThemes('Button', { default: styles });
export const themeButton = createWithUserThemes(Button, styles);

export default wrapWithThemes(Button);
