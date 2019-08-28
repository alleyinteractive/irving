import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';

// Icons
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './topicHeader.css';

const TopicHeader = ({
  name, description, children, color,
}) => {
  const image = findChildByName('image', children);
  const articles = filterChildrenByName(
    'term-archive-pinned-article',
    children
  );

  /**
   * @todo MIT-102 all these buttons do is appear and disappear based on
   * whether or not the user has scrolled the slider. They should:
   * - Actually move the slider
   * - Not appear when the slider cannot be slid in that direction any further.
   */
  const sliderRef = React.createRef();
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <header className={styles.wrapper} style={{ backgroundColor: color }}>
      <div className={styles.meta}>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.image}>{image}</div>
      {articles && (
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
                // @todo MIT-102 this does not work.
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

TopicHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(TopicHeader);
