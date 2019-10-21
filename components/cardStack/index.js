import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Icons
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './cardStack.css';

const CardStack = ({
  name,
  description,
  children,
  color,
  isSubtopic,
  isSponsored,
  sponsored: { url: sponsorLink },
}) => {
  const image = findChildByName('image', children);
  const logo = findChildByName('logo', children);
  const articles = filterChildrenByName('link-teaser', children);

  /**
   * @todo MIT-201 all these buttons do is appear and disappear based on
   * whether or not the user has scrolled the slider. They should:
   * - Actually move the slider
   * - Not appear when the slider cannot be slid in that direction any further.
   */
  const sliderRef = React.createRef();
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={isSubtopic || ! image ? styles.metaFull : styles.meta}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      {! isSubtopic && image && <div className={styles.image}>{image}</div>}
      {isSponsored && (
        <div className={styles.sponsored}>
          <h2 className={styles.sponsorLabel} style={{ color }}>
            <span aria-hidden>{__('Sponsored', 'mittr')}</span>
            {/* Re-phrase the heading for context for screen readers. */}
            <span className="screen-reader-text">
              {__('Collection sponsor', 'mittr')}
            </span>
          </h2>
          <Link to={sponsorLink} className={styles.sponsorLink}>
            {/* Name of sponsor in logo alt text. */}
            {logo}
          </Link>
        </div>
      )}
      {0 < articles.length && (
        <div
          className={styles.slider}
          ref={sliderRef}
          onScroll={() => {
            setHasScrolled(true);
          }}
        >
          <ol className={styles.list}>
            {articles.map((article, count) => (
              <li className={styles.featured} key={article.props.title}>
                <div className={styles.counter} aria-hidden>
                  0{count + 1}.
                </div>
                {article}
              </li>
            ))}
          </ol>
          {hasScrolled ? (
            <button
              type="button"
              className={styles.previous}
              onClick={() => setHasScrolled(false)}
            >
              <Arrow aria-hidden />
              <span className="screen-reader-text">{__('Next', 'mittr')}</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.next}
              onClick={() => {
                setHasScrolled(true);
                // @todo MIT-210 this does not work.
                const { offsetWidth } = sliderRef;
                sliderRef.current.style = {
                  transform: `translateX(-${offsetWidth}px)`,
                };
              }}
            >
              <Arrow aria-hidden />
              <span className="screen-reader-text">
                {__('Previous', 'mittr')}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

CardStack.defaultProps = {
  isSubtopic: false,
  sponsored: {},
  isSponsored: false,
};

CardStack.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSubtopic: PropTypes.bool,
  isSponsored: PropTypes.bool,
  sponsored: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default withStyles(styles)(CardStack);
