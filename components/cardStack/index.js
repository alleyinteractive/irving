import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import withThemes from 'components/hoc/withThemes';
import ExpandableSocialShare from 'components/socialList/expandable';
import classNames from 'classnames';

// Components
import ContentSlider from './contentSlider';
import Eyebrow from '../eyebrow';

// Styles
import styles from './cardStack.css';
import horizontalTheme from './cardStack--isHorizontal.css';
import noImageTheme from './cardStack--noImage.css';

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
  isCollection,
}) => {
  const image = findChildByName('image', children);
  const logo = findChildByName('logo', children);
  const articles = filterChildrenByName('link-teaser', children);
  const socialSharing = findChildByName('social-sharing', children);
  const hasContentSlider = 0 < articles.length;

  return (
    <article className={theme.wrapper} style={{ backgroundColor: color }}>
      { (eyebrow || ! isCollection) && (
        <div className={theme.meta}>
          { eyebrow && (
            <Eyebrow
              customEyebrow={eyebrow}
              themeName="anchorEyebrow"
              color={textColor}
              dateline={dateline}
            />
          )}
          {! isCollection && (
            <ExpandableSocialShare color={textColor}>
              {socialSharing}
            </ExpandableSocialShare>
          )}
        </div>
      )}
      <div className={isSubtopic || ! image ? theme.bodyFull : theme.body}>
        <div className={theme.bodyCopy}>
          {/* @todo heading level needs to be dynamic, homepage has > 1 h1 */}
          <h1 className={theme.name} style={{ color: textColor }}>
            <Link to={permalink}>
              {name}
            </Link>
          </h1>
          <p className={theme.description}>{description}</p>
        </div>
        {! isSubtopic && image && (
          <div
            className={classNames(
              theme.image,
              {
                [theme.withoutSlider]: ! hasContentSlider,
              }
            )}
          >
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
      </div>
      {hasContentSlider && (
        <ContentSlider articles={articles} contentItemWidth={288} />
      )}
    </article>
  );
};

CardStack.defaultProps = {
  dateline: '',
  eyebrow: false,
  isSubtopic: false,
  sponsored: {},
  isSponsored: false,
  textColor: '#FFFFFF',
  isCollection: false,
};

CardStack.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string.isRequired,
  dateline: PropTypes.string,
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  textColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  isSubtopic: PropTypes.bool,
  isSponsored: PropTypes.bool,
  sponsored: PropTypes.shape({
    url: PropTypes.string,
  }),
  theme: PropTypes.object.isRequired,
  isCollection: PropTypes.bool,
};

export default withThemes('card-stack', {
  default: styles,
  isVertical: styles,
  isHorizontal: horizontalTheme,
  noImage: noImageTheme,
})(withStyles(styles, horizontalTheme, noImageTheme)(CardStack));
