import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import styles from './menu.css';

const Menu = (props) => {
  const {
    children, displayTitle, themeName, title, titleLink,
  } = props;

  return (
    <nav className={className(styles.wrapper, styles[themeName])}>
      {title && displayTitle && (
        <h2 className={styles.title}>
          {titleLink ? (
            <Link className={styles.titleLink} to={titleLink}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h2>
      )}
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  displayTitle: PropTypes.bool,
  themeName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleLink: PropTypes.string,
};

Menu.defaultProps = {
  titleLink: '',
};

Menu.defaultProps = {
  displayTitle: false,
};

export default withStyles(styles)(Menu);
