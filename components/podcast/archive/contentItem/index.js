import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import withThemes from 'components/hoc/withThemes';
// Styles
import styles from './podcastContentItem.css';
import featuredTheme from './podcastContentItem--featured.css';

const PodcastContentItem = ({
  children,
  eyebrow,
  moreButtonText,
  permalink,
  theme,
  themeName,
  time,
  title,
}) => {
  const description = findChildByName('html', children);
  const image = findChildByName('image', children);
  const Wrapper = 'featured' === themeName ? 'div' : 'li';

  return (
    <Wrapper className={theme.wrapper}>
      <div className={theme.inner}>
        <div className={theme.content}>
          {eyebrow && <span className={theme.eyebrow}>{eyebrow}</span>}
          <h2 className={theme.title}>
            <Link to={permalink}>{title}</Link>
          </h2>
          {time && <span className={theme.time}>{time}</span>}
          <div className={theme.description}>{description}</div>
          {moreButtonText && <button type="button">{moreButtonText}</button>}
        </div>
        <div className={theme.image}>
          <Link to={permalink}>{image}</Link>
        </div>
      </div>
    </Wrapper>
  );
};

PodcastContentItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  eyebrow: PropTypes.string.isRequired,
  moreButtonText: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withThemes('hub-content-item', {
  default: styles,
  featured: featuredTheme,
})(withStyles(styles)(PodcastContentItem));
