import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import parse from 'html-react-parser';
import DownloadPDFLink from 'components/zephrUI/regions/downloadPDFLink';
import useBreakpoint from 'hooks/useBreakpoint';

// SVGs
import ArrowIcon from 'assets/icons/arrow.svg';

// Styles
import styles from './magazineHero.css';

const MagazineHero = ({
  backgroundColor,
  children,
  description,
  issueDate,
  issueNavigation,
  issueType,
  letter,
  mitNewsLink,
  pdfLink,
  textColor,
  title,
}) => {
  const image = findChildByName('image', children);
  const [isMobile, setIsMobile] = useState(false);
  // determine if mobile
  const isSmMin = useBreakpoint('smMin');
  useEffect(() => {
    if (! isSmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  return (
    <header className={styles.wrapper}>
      <div className={styles.topper}>
        <h1 className={styles.topperTitle}>
          {'MIT News Magazine' === issueType ?
            __('MIT News Magazine', 'mittr') :
            __('Magazine', 'mittr')
          }
        </h1>
        <nav className={styles.publicationNav}>
          <ul role="menubar">
            <li role="menuitem">
              <Link to="#past-issues" className={styles.publicationLink}>
                {__('View previous issues', 'mittr')}
              </Link>
            </li>
            <li role="menuitem">
              <Link to={mitNewsLink} className={styles.publicationLink}>
                {'MIT News Magazine' !== issueType ?
                  __('MIT News Magazine', 'mittr') :
                  __('MIT Technology Review Magazine', 'mittr')
                }
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
          <p className={styles.description}>{parse(description)}</p>
          <Link to="#features" className={styles.readLink}>
            {__('Read the issue', 'mittr')}
          </Link>
          <DownloadPDFLink pdfLink={pdfLink} />
          {'' !== letter.title &&
            '' !== letter.url &&
            'MIT News Magazine' !== issueType && (
            <div className={styles.letter}>
              <h2 className={styles.letterLabel}>
                {__('Letter from the editor', 'mittr')}
              </h2>
              <Link to={letter.url} className={styles.letterTitle}>
                {letter.title}
              </Link>
            </div>
          )}
          {'MIT News Magazine' === issueType && (
            <div className={styles.letter}>
              <h2 className={styles.letterLabel}>
                {__('MIT Class notes and Course news', 'mittr')}
              </h2>
              <Link
                to="https://alum.mit.edu/communities/class-notes-and-sites"
                className={styles.letterTitle}
              >
                {__('Read Class notes and Course news on the MIT Alumni Association website',
                  'mittr')}
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
                  {(issueNavigation.previous &&
                    window.location.href !== issueNavigation.previous) && (
                    <Link
                      to={issueNavigation.previous}
                      className={styles.navLink}
                    >
                      <span className={styles.icon} aria-hidden>
                        <ArrowIcon />
                      </span>
                      {! isMobile ? __('View previous issue', 'mittr') : ''}
                    </Link>
                  )}

                </li>
                <li className={styles.next}>
                  {(issueNavigation.next &&
                    window.location.href !== issueNavigation.next) && (
                    <Link to={issueNavigation.next} className={styles.navLink}>
                      {! isMobile ? __('View next issue', 'mittr') : ''}
                      <span className={styles.icon} aria-hidden>
                        <ArrowIcon />
                      </span>
                    </Link>
                  )}
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

MagazineHero.defaultProps = {
  issueType: '',
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
  issueType: PropTypes.string,
  mitNewsLink: PropTypes.string.isRequired,
  letter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  pdfLink: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineHero);
