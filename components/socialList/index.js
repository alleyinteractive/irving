import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './socialList.css';

const SocialList = (props) => {
  const { children: links } = props;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {links}
      </ul>
    </div>
  );
};

SocialList.propTypes = {
  children: PropTypes.node.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SocialList);
