import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import parseUrl from 'utils/getRelativeUrl';
import history from 'utils/history';
import { GTMContext } from 'components/googleTagManager';

// Assets and styles.
import Arrow from 'assets/icons/arrow.svg';
import styles from './contentSlider.css';

const ContentSlider = ({ articles, contentItemWidth, textColor }) => {
  const [sliderState, setSliderState] = useState({
    currentIndex: 0,
  });

  const { pushEvent } = useContext(GTMContext);

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

  // Custom onClick event for links inside a contentSlider.
  const handleClick = (e, count, permalink) => {
    const relativeUrl = parseUrl(permalink);

    // This duplicates the default onClick logic from the Link component
    // to ensure links use history.push instead of full page reloads
    // which is necessary, since we are overriding the default behavior.
    if (relativeUrl) {
      e.preventDefault();
      history.push(relativeUrl);

      pushEvent('click', {
        action: 'click',
        category: 'minicard-stack',
        label: `feed-unit-${count}`,
      });
    }
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
          {articles.map((article, count) => {
            const slideNum = count + 1;
            const { permalink } = article.props;

            // Add an onClick property to linkTeasers specific to this context.
            const articleLink = {
              ...article,
              props: {
                ...article.props,
                onClick: (e) => handleClick(e, slideNum, permalink),
                textColor,
              },
            };

            return (
              <li
                className={styles.listItem}
                key={article.props.title}
                // Only scroll when focus passes first element so its still in the view
                onFocus={() => (1 <= count ? scrollSlider(true) : null)}
                style={{ borderColor: textColor }}
              >
                <div
                  className={styles.counter}
                  aria-hidden
                  style={{ color: textColor }}
                >
                  {`${slideNum}`.padStart(2, '0')}.
                </div>
                {articleLink}
              </li>
            );
          })}
        </ol>
      </div>
      {0 !== sliderState.currentIndex && (
        <button
          type="button"
          className={styles.previous}
          onClick={() => scrollSlider(false)}
          style={{ background: textColor }}
        >
          <Arrow aria-hidden style={{ borderColor: textColor }} />
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
          style={{ background: textColor }}
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
  textColor: '',
};

ContentSlider.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({}))
    .isRequired,
  contentItemWidth: PropTypes.number,
  textColor: PropTypes.string,
};

export default (withStyles(styles)(ContentSlider));
