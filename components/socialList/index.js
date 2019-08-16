import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import styles from './socialList.css';

const SocialList = (props) => {
  const { children: links } = props;
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {__('Share', 'mittr')}
      </h3>
      <ul className={styles.list}>
        {links}
      </ul>
    </div>
  );
};

SocialList.propTypes = {
  /**
   * Component children, usually a list of `<SocialItem />` components
   */
  children: PropTypes.node.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SocialList);
