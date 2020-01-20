import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

// Styles
import styles from './teaserItem.css';
import simpleTheme from './teaserItem--simple.css';
import asideTheme from './teaserItem--aside.css';
import storyGroupTheme from './teaserItem--storygroup.css';
import sponsorTheme from './teaserItem--sponsor.css';

import Meta from './meta.js';

const TeaserItem = ({
  children,
  color,
  excerpt,
  itemPosition,
  permalink,
  postDate,
  showImage,
  teaseCTA,
  theme,
  themeName,
  title,
  topic,
  topicLink,
  sponsorIntro,
  sponsorName,
  sponsorLogo,
  sponsorUrl,
}) => {
  const [sharingIsVisible, setSharingIsVisible] = useState(false);
  const image = findChildByName('image', children);
  const video = findChildByName('video', children);
  const socialSharing = findChildByName('social-sharing', children);
  const isSponsored = (
    (sponsorName || sponsorLogo) &&
    sponsorUrl &&
    'sponsored' === themeName
  );

  const otherChildren = children.filter(
    ({ props: { componentName } }) => ('image' !== componentName) &&
      ('video' !== componentName) && ('social-sharing' !== componentName)
  );

  if ('simple' === themeName) {
    return (
      <Link
        className={classNames(theme.wrapper, [theme[itemPosition]])}
        to={permalink}
      >
        <div className={theme.meta}>
          <h3 className={theme.title}>{title}</h3>
          <p className={theme.excerpt}>{excerpt}</p>
        </div>
        {image && <div className={theme.image}>{image}</div>}
        {video}
      </Link>
    );
  }

  const Header = () => (
    <header className={theme.header}>
      <h3 className={classNames(theme.title, {
        [theme.groupTitle]: 'storygroup' === themeName,
      })}
      >
        <Link to={permalink}>{title}</Link>
      </h3>
      {'aside' === themeName && <p className={theme.excerpt}>{excerpt}</p>}
    </header>
  );

  return (
    <article
      className={classNames(theme.wrapper, [theme[itemPosition]], {
        [theme.hasImage]: image,
        [theme.featuredGroup]: 'storygroup' === themeName,
      })}
    >
      <div className={theme.text}>
        {('sponsored' === themeName) && (
          <span className={theme.sponsoredFlag}>
            {__('Sponsored', 'mittr')}
          </span>
        )}
        {('search' !== themeName && 'infeed' !== themeName) && <Header />}
        {(
          'storygroup' !== themeName &&
          'sponsored' !== themeName
        ) && (
          <Meta
            theme={theme}
            topicLink={topicLink}
            postDate={postDate}
            topic={topic}
            color={color}
          />
        )}
        {/* Place the header beneath the meta info on the search template */}
        {('search' === themeName || 'infeed' === themeName) && <Header />}
      </div>
      {('aside' !== themeName && 'storygroup' !== themeName) && (
        <p className={theme.excerpt}>{excerpt}</p>
      )}
      {('' !== teaseCTA &&
        'infeed' !== themeName &&
        'storygroup' !== themeName &&
        'sponsored' !== themeName) && (
        <Link to={permalink} className={theme.callToAction}>
          {teaseCTA}
        </Link>
      )}
      {(
        image &&
        showImage &&
        ('storygroup' !== themeName && 'sponsored' !== themeName)
      ) && (
        <Link to={permalink} tabIndex="-1" className={theme.image}>
          {image}
        </Link>
      )}
      {'storygroup' !== themeName && video}
      {'storygroup' !== themeName && otherChildren}
      <div className={theme.shareMenu}>
        <button
          type="button"
          aria-label={__('Open share menu', 'mittr')}
          className={theme.shareMenuToggle}
          onClick={() => {
            setSharingIsVisible(! sharingIsVisible);
          }}
          aria-haspopup
          aria-expanded={sharingIsVisible}
        >
          <div className={theme.dot} />
          <div className={theme.dot} />
          <div className={theme.dot} />
        </button>
        <div className={theme.shareMenuFlyOut}>
          {sharingIsVisible && socialSharing}
        </div>
      </div>
      {isSponsored && (
        <Link to={sponsorUrl} className={theme.sponsor}>
          {sponsorLogo && (
            <img
              className={theme.sponsorLogo}
              src={sponsorLogo}
              alt={sponsorName || sponsorUrl}
            />
          )}
          {sponsorName && (
            <div className={theme.sponsorContent}>
              {sponsorIntro && <span>{sponsorIntro}</span>}
              {sponsorName}
            </div>
          )}
        </Link>
      )}
    </article>
  );
};

TeaserItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  color: PropTypes.string,
  excerpt: PropTypes.string.isRequired,
  itemPosition: PropTypes.string,
  permalink: PropTypes.string.isRequired,
  postDate: PropTypes.string,
  showImage: PropTypes.bool,
  teaseCTA: PropTypes.string,
  theme: PropTypes.shape({
    callToAction: PropTypes.string,
    dot: PropTypes.string,
    excerpt: PropTypes.string,
    eyebrow: PropTypes.string,
    eyebrowLink: PropTypes.string,
    header: PropTypes.string,
    hasImage: PropTypes.string,
    image: PropTypes.string,
    meta: PropTypes.string,
    shareMenu: PropTypes.string,
    shareMenuToggle: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
  themeName: PropTypes.string,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string,
  topicLink: PropTypes.string,
  sponsorIntro: PropTypes.string,
  sponsorName: PropTypes.string,
  sponsorLogo: PropTypes.string,
  sponsorUrl: PropTypes.string,
};

TeaserItem.defaultProps = {
  themeName: '',
  color: '',
  showImage: true,
  teaseCTA: '',
  topic: '',
  postDate: '',
  topicLink: '',
  itemPosition: '',
  sponsorIntro: '',
  sponsorName: '',
  sponsorLogo: '',
  sponsorUrl: '',
};

export default withThemes('teaser-item', {
  default: styles,
  simple: simpleTheme,
  aside: asideTheme,
  storygroup: storyGroupTheme,
  sponsored: sponsorTheme,
})(withStyles(styles, simpleTheme, asideTheme, storyGroupTheme)(TeaserItem));
