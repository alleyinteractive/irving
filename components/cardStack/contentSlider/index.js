import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';

// Assets and styles.
import Arrow from 'assets/icons/arrow.svg';
import styles from './contentSlider.css';

const ContentSlider = ({ articles, contentItemWidth }) => {
  const [sliderState, setSliderState] = useState({
    currentIndex: 0,
  });

  const getScrollPosition = () => {
    if (0 === sliderState.currentIndex) {
      return '0';
    }
    if (sliderState.currentIndex < articles.length &&
      0 !== sliderState.currentIndex) {
      return `-${contentItemWidth * sliderState.currentIndex}px`;
    }
    return 0;
  };

  const scrollSlider = (isNext) => {
    if (isNext) {
      setSliderState({ currentIndex: sliderState.currentIndex + 1 });
    } else {
      setSliderState({ currentIndex: sliderState.currentIndex - 1 });
    }
    getScrollPosition();
  };
  return (
    <div className={styles.sliderWrap}>
      <div
        className={styles.slider}
        style={{
          transform: `translateX(${getScrollPosition()})`,
        }}
      >
        <ol className={styles.list}>
          {articles.map((article, count) => (
            <li
              className={styles.listItem}
              key={article.props.title}
              // Only scroll when focus passes first element so its still in the view
              onFocus={() => (1 <= count ? scrollSlider(true) : null)}
            >
              <div className={styles.counter} aria-hidden>
                0{count + 1}.
              </div>
              {article}
            </li>
          ))}
        </ol>
      </div>
      {0 !== sliderState.currentIndex && (
        <button
          type="button"
          className={styles.previous}
          onClick={() => scrollSlider(false)}
        >
          <Arrow aria-hidden />
          <span className="screen-reader-text">
            {__('Next', 'mittr')}
          </span>
        </button>
      )}
      {(sliderState.currentIndex < (articles.length - 1)) && (
        <button
          type="button"
          className={styles.next}
          onClick={() => scrollSlider(true)}
        >
          <Arrow aria-hidden />
          <span className="screen-reader-text">
            {__('Previous', 'mittr')}
          </span>
        </button>
      )}
    </div>
  );
};

ContentSlider.defaultProps = {
  contentItemWidth: 288,
};

ContentSlider.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({}))
    .isRequired,
  contentItemWidth: PropTypes.number,
};

export default (withStyles(styles)(ContentSlider));
