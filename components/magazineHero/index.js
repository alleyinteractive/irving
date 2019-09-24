import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';

// Styles
import ArrowIcon from 'assets/icons/arrow.svg';
import styles from './magazineHero.css';

// SVGs

const MagazineHero = ({
  backgroundColor,
  children,
  description,
  issueDate,
  issueNavigation,
  letter,
  MITNewsLink,
  pdfLink,
  textColor,
  title,
}) => {
  const image = findChildByName('image', children);
  return (
    <header className={styles.wrapper}>
      <div className={styles.topper}>
        <h1 className={styles.topperTitle}>{__('Magazine', 'mittr')}</h1>
        <nav className={styles.publicationNav}>
          <ul role="menubar">
            <li role="menuitem">
              <Link to="#past-issues" className={styles.publicationLink}>
                {__('View previous issues', 'mittr')}
              </Link>
            </li>
            <li role="menuitem">
              <Link to={MITNewsLink} className={styles.publicationLink}>
                {__('MIT News Magazine', 'mittr')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={styles.container}
        style={{
          // stylelint-disable
          '--text-color': textColor,
          color: textColor,
          backgroundColor,
        }}
      >
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.date}>{issueDate}</div>
          <p className={styles.description}>{description}</p>
          <Link to="#features" className={styles.readLink}>
            {__('Read the issue', 'mittr')}
          </Link>
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
              <ul className={styles.navList} aria-labelledby="navigate-issues">
                <li className={styles.previous}>
                  <Link
                    to={issueNavigation.previous}
                    className={styles.navLink}
                  >
                    <span className={styles.icon} aria-hidden>
                      <ArrowIcon />
                    </span>
                    {__('View previous issue', 'mittr')}
                  </Link>
                </li>
                <li className={styles.next}>
                  <Link to={issueNavigation.next} className={styles.navLink}>
                    {__('View next issue', 'mittr')}
                    <span className={styles.icon} aria-hidden>
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <div className={styles.image}>{image}</div>
      </div>
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
  MITNewsLink: PropTypes.string.isRequired,
  letter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  pdfLink: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineHero);
