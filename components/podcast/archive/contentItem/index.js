import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Button from 'components/helpers/button';
import Link from 'components/helpers/link';
import withThemes from 'components/hoc/withThemes';
// Styles
import styles from './podcastContentItem.css';
import featuredTheme from './podcastContentItem--featured.css';

const PodcastContentItem = ({
  children,
  className,
  date,
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
    <Wrapper className={classNames(theme.wrapper, theme[className])}>
      <div className={theme.inner}>
        <div className={theme.content}>
          {eyebrow && <span className={theme.eyebrow}>{eyebrow}</span>}
          <h2 className={theme.title}>
            <Link to={permalink}>{title}</Link>
          </h2>
          {(time || date) && (
            <span className={theme.timeDate}>
              {time && <span className={theme.time}>{time} | </span>}
              {date && <span className={theme.date}>{date}</span>}
            </span>
          )}
          <div className={theme.description}>{description}</div>
          {(moreButtonText && 'featured' === themeName) && (
            <Button
              buttonStyle="primary"
              link={permalink}
              className={theme.moreButton}
            >
              {moreButtonText}
            </Button>
          )}
        </div>
        <div className={theme.image}>
          <Link to={permalink}>{image}</Link>
        </div>
      </div>
    </Wrapper>
  );
};

PodcastContentItem.defaultProps = {
  className: '',
  eyebrow: '',
  moreButtonText: '',
};

PodcastContentItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  moreButtonText: PropTypes.string,
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
