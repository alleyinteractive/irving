import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import styles from './magazineHero.css';

const MagazineHero = ({
  backgroundColor,
  children,
  description,
  issueDate,
  issueNavigation,
  letter,
  pdfLink,
  textColor,
  title,
}) => {
  const image = findChildByName('image', children);
  return (
    <header
      className={styles.wrapper}
      styles={{ color: textColor, backgroundColor }}
    >
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.date}>{issueDate}</div>
      <p className={styles.description}>{description}</p>
      <Link to="#features">{__('Read the issue', 'mittr')}</Link>
      <Link to={pdfLink} className={styles.pdfLink}>
        {__('Open the PDF', 'mittr')}
      </Link>
      {'' !== letter.title && '' !== letter.url && (
        <div className={styles.letter}>
          <h2 className={styles.letterLabel}>
            {__('Letter from the editor', 'mittr')}
          </h2>
          <Link to={letter.url} className={styles.letterTitle}>
            {letter.title}
          </Link>
        </div>
      )}
      {issueNavigation && (
        <nav className={styles.navigation}>
          <h2 className="screen-reader-text" id="navigate-issues">
            {__('Issue navigation', 'mittr')}
          </h2>
          <ul clasName={styles.navList} aria-labelledby="navigate-issues">
            <li className={styles.previous}>
              <Link to={issueNavigation.previous}>
                {__('View previous issue', 'mittr')}
              </Link>
            </li>
            <li className={styles.next}>
              <Link to={issueNavigation.next}>
                {__('View next issue', 'mittr')}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {image}
    </header>
  );
};

MagazineHero.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  issueDate: PropTypes.string.isRequired,
  issueNavigation: PropTypes.shape({
    previous: PropTypes.string,
    next: PropTypes.string,
  }).isRequired,
  letter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  pdfLink: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineHero);
