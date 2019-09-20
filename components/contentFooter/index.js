import React from 'react';
import PropTypes from 'prop-types';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import withThemes from 'components/hoc/withThemes';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './contentFooter.css';
import infeedTheme from './contentFooter--infeed.css';
import inlineTheme from './contentFooter--inline.css';

const ContentFooter = ({ children, author, theme }) => {
  const socialSharing = findChildByName('social-sharing', children);
  const tags = filterChildrenByName('tags', children);
  return (
    <footer className={theme.wrapper}>
      <h2 className={theme.title}>{__('Article meta', 'mittr')}</h2>
      <div className={theme.social}>{socialSharing}</div>
      {tags && tags.children && (
        <div className={theme.tags}>
          <h3 className={theme.label}>{__('Tagged', 'mittr')}</h3>
          {tags}
        </div>
      )}
      {author && author.name && (
        <address className={theme.author}>
          <h3 className={theme.label}>{__('Author', 'mittr')}</h3>
          {/* @todo this needs an image */}
          <Link to={author.url}>{author.name}</Link>
        </address>
      )}
    </footer>
  );
};

ContentFooter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    author: PropTypes.string,
    label: PropTypes.string,
    social: PropTypes.string,
    tags: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
};

export default withThemes('content-footer', {
  default: styles,
  infeed: infeedTheme,
  inline: inlineTheme,
})(withStyles(styles, infeedTheme, inlineTheme)(ContentFooter));
