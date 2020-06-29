import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withThemes from 'components/hoc/withThemes';
import createWithUserThemes from 'components/hoc/createWithUserThemes';
import styles from './container.css';

const Container = (props) => {
  const {
    size,
    children,
    className,
    theme,
  } = props;

  return (
    <div
      className={classNames(
        theme[size],
        className
      )}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  /**
   * Container children.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional classnames to apply to this container.
   */
  className: PropTypes.string,
  /**
   * Width of the container.
   */
  size: PropTypes.string,
  /**
   * Width of the container.
   */
  theme: PropTypes.object.isRequired,
};

Container.defaultProps = {
  size: 'xxl',
  className: '',
};

const wrapWithThemes = withThemes('Container', { default: styles });
export const themeContainer = createWithUserThemes(Container, styles);

export default wrapWithThemes(Container);
