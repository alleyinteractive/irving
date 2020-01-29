import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import dashify from 'dashify';
import Link from 'components/helpers/link';

// Styles
import styles from './listMenuItem.css';

const ListMenuItem = ({ title, url, useAnchorNav }) => {
  const anchorLink = `#${dashify(title)}`;
  return (
    <li className={styles.wrapper}>
      <Link to={useAnchorNav ? anchorLink : url} className={styles.link}>
        {title}
      </Link>
    </li>
  );
};

ListMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  useAnchorNav: PropTypes.bool,
};

ListMenuItem.defaultProps = {
  useAnchorNav: false,
};

export default withStyles(styles)(ListMenuItem);
