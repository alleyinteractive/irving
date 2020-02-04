import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
import withThemes from 'components/hoc/withThemes';
// Styles
import styles from './hubContentItem.css';
import featuredTheme from './hubContentItem--featured.css';

const HubContentItem = ({
  children,
  eyebrow,
  permalink,
  theme,
  themeName,
  title,
}) => {
  const description = findChildByName('html', children);
  const image = findChildByName('image', children);
  const Wrapper = 'featured' === themeName ? 'div' : 'li';

  return (
    <Wrapper className={theme.wrapper}>
      <div className={theme.inner}>
        <div className={theme.content}>
          <span className={theme.eyebrow}>{eyebrow}</span>
          <h2 className={theme.title}>
            <Link to={permalink}>{title}</Link>
          </h2>
          <div className={theme.description}>{description}</div>
        </div>
        <div className={theme.image}>
          <Link to={permalink}>{image}</Link>
        </div>
      </div>
    </Wrapper>
  );
};

HubContentItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  eyebrow: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default withThemes('hub-content-item', {
  default: styles,
  featured: featuredTheme,
})(withStyles(styles)(HubContentItem));
