import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import withThemes from 'components/hoc/withThemes';

// Icons
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './cardStack.css';
import horizontalTheme from './cardStack--isHorizontal.css';
import noImageTheme from './cardStack--noImage.css';
import Eyebrow from '../eyebrow';

const CardStack = ({
  children,
  color,
  dateline,
  description,
  eyebrow,
  isSponsored,
  isSubtopic,
  name,
  permalink,
  textColor,
  sponsored: { url: sponsorLink },
  theme,
}) => {
  const image = findChildByName('image', children);
  const logo = findChildByName('logo', children);
  const articles = filterChildrenByName('link-teaser', children);
  const scrollItemWidth = 288; // width of each list item.

  const [sliderState, setSliderState] = useState({
    currentIndex: 0,
  });

  const getScrollPosition = () => {
    if (0 === sliderState.currentIndex) {
      return '0';
    }
    if (sliderState.currentIndex < articles.length &&
      0 !== sliderState.currentIndex) {
      return `-${scrollItemWidth * sliderState.currentIndex}px`;
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
    <header className={theme.wrapper} style={{ backgroundColor: color }}>
      <div className={isSubtopic || ! image ? theme.metaFull : theme.meta}>
        { eyebrow && (
          <Eyebrow
            customEyebrow={eyebrow}
            themeName="anchorEyebrow"
            color={textColor}
            dateline={dateline}
          />
        )}
        {/* @todo heading level needs to be dynamic, homepage has > 1 h1 */}
        <h1 className={theme.name} style={{ color: textColor }}>
          <Link to={permalink}>
            {name}
          </Link>
        </h1>
        <p className={theme.description}>{description}</p>
      </div>
      {! isSubtopic && image && (
        <div className={theme.image}>
          <Link to={permalink}>
            {image}
          </Link>
        </div>
      )}
      {isSponsored && (
        <div className={theme.sponsored}>
          <h2 className={theme.sponsorLabel} style={{ color }}>
            <span aria-hidden>{__('Sponsored', 'mittr')}</span>
            {/* Re-phrase the heading for context for screen readers. */}
            <span className="screen-reader-text">
              {__('Collection sponsor', 'mittr')}
            </span>
          </h2>
          <Link to={sponsorLink} className={theme.sponsorLink}>
            {/* Name of sponsor in logo alt text. */}
            {logo}
          </Link>
        </div>
      )}
      {0 < articles.length && (
        <div className={theme.sliderWrap}>
          <div
            className={theme.slider}
            style={{
              transform: `translateX(${getScrollPosition()})`,
            }}
          >
            <ol className={theme.list}>
              {articles.map((article, count) => (
                <li
                  className={theme.listItem}
                  key={article.props.title}
                  // Only slide when focus passes first element so its still in the view
                  onFocus={() => (1 <= count ? scrollSlider(true) : null)}
                >
                  <div className={theme.counter} aria-hidden>
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
              className={theme.previous}
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
              className={theme.next}
              onClick={() => scrollSlider(true)}
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
  dateline: '',
  eyebrow: false,
  isSubtopic: false,
  sponsored: {},
  isSponsored: false,
};

CardStack.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  dateline: PropTypes.string,
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  textColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  isSubtopic: PropTypes.bool,
  isSponsored: PropTypes.bool,
  sponsored: PropTypes.shape({
    url: PropTypes.string,
  }),
  theme: PropTypes.object.isRequired,
};

export default withThemes('card-stack', {
  default: styles,
  isVertical: styles,
  isHorizontal: horizontalTheme,
  noImage: noImageTheme,
})(withStyles(styles, horizontalTheme, noImageTheme)(CardStack));
