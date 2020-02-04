import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import withThemes from 'components/hoc/withThemes';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import classNames from 'classnames';
import ExpandableSocialShare from 'components/socialList/expandable';

// Styles
import styles from './teaserItem.css';
import simpleTheme from './teaserItem--simple.css';
import asideTheme from './teaserItem--aside.css';
import storyGroupTheme from './teaserItem--storygroup.css';

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
}) => {
  const image = findChildByName('image', children);
  const video = findChildByName('video', children);
  const socialSharing = findChildByName('social-sharing', children);

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
        {('search' !== themeName && 'infeed' !== themeName) && <Header />}
        {'storygroup' !== themeName && (
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
        'storygroup' !== themeName) && (
        <Link to={permalink} className={theme.callToAction}>
          {teaseCTA}
        </Link>
      )}
      {(image && showImage && 'storygroup' !== themeName) && (
        <Link to={permalink} tabIndex="-1" className={theme.image}>
          {image}
        </Link>
      )}
      {'storygroup' !== themeName && video}
      {'storygroup' !== themeName && otherChildren}
      <ExpandableSocialShare>
        {socialSharing}
      </ExpandableSocialShare>
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
};

export default withThemes('teaser-item', {
  default: styles,
  simple: simpleTheme,
  aside: asideTheme,
  storygroup: storyGroupTheme,
})(withStyles(styles, simpleTheme, asideTheme, storyGroupTheme)(TeaserItem));
