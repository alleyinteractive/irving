import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import styles from './shareStories.css';

const ShareStories = ({ link }) => (
  <div className={styles.wrap}>
    <div className={styles.left}>
      <h4 className={styles.title}>
        <span className={styles.bold}>
          {__('Have an idea ', 'mittr')}
        </span>
        {__('for a great MIT story? ', 'mittr')}
      </h4>
      <hr className={styles.separator} />
    </div>
    <div className={styles.right}>
      <p>{__(`If you know of any MIT alumni making a difference
        in their corner of the planet, let us know. We always welcome your
        ideas for interesting stories about the MIT community.`, 'mittr')}
      </p>
      <a className={styles.link} href={link}>
        {__('Share your stories', 'mittr')}
      </a>
    </div>
  </div>
);

ShareStories.propTypes = {
  link: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(ShareStories);
