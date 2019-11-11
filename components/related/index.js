import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './related.css';
import Link from '../helpers/link';

const Related = ({
  headline, url, featuredImg, deck,
}) => (
  <aside className={styles.wrap}>
    <h5 className={styles.header}>{ __('Related Story', 'mittr')}</h5>
    { featuredImg && (
      <Link to={url}>
        <img src={featuredImg} alt={headline} className={styles.featuredImg} />
      </Link>
    )}
    <Link to={url} className={styles.link}>{headline}</Link>
    <p className={styles.deck}>
      {deck}
    </p>
  </aside>
);

Related.propTypes = {
  headline: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  featuredImg: PropTypes.string.isRequired,
  deck: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Related);
