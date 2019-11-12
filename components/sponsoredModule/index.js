import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Components
import Link from 'components/helpers/link';

// Styles
import styles from './sponsoredModule.css';

const SponsoredModule = ({
  children, url, name, intro,
}) => {
  const logo = findChildByName('image', children);
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{__('Sponsored content', 'mittr')}</h2>
      <p className={styles.intro}>
        {'' !== intro &&
          (
            <span>
              {intro}
            </span>
          )
        }
        <Link to={url} className={styles.name}>{name}</Link>
      </p>
      {logo && (
        <a className={styles.logo} href={url} tabIndex="-1'" aria-hidden>
          {logo}
        </a>
      )}
    </section>
  );
};

SponsoredModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  intro: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(SponsoredModule);
