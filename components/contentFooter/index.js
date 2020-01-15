import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import withThemes from 'components/hoc/withThemes';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './contentFooter.css';
import infeedTheme from './contentFooter--infeed.css';
import inlineTheme from './contentFooter--inline.css';
import Image from '../image/image';

const ContentFooter = ({
  children, authors, theme, imageCredit,
}) => {
  const socialSharing = findChildByName('social-sharing', children);
  const tags = filterChildrenByName('tags', children);
  return (
    <footer className={theme.wrapper}>
      <h2 className={theme.title}>{__('Article meta', 'mittr')}</h2>
      <div className={theme.social}>{socialSharing}</div>
      {0 < tags.length && (
        <div className={theme.tags}>
          <h3 className={theme.label}>{__('Tagged', 'mittr')}</h3>
          {tags}
        </div>
      )}

      {0 < authors.length && (
        <address className={theme.author}>
          <h3 className={theme.label}>{__('Author', 'mittr')}</h3>
          {authors.map((author) => (
            <Fragment>
              {'' !== author.url ? (
                <Link
                  to={author.url}
                  key={author.name}
                  className={theme.authorLink}
                >
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      className={theme.avatar}
                      picture={false}
                    />
                  )}
                  <span className={theme.item}>{author.name}</span>
                </Link>
              ) : (
                <span
                  className={classNames(theme.authorLink, theme.item)}
                  key={author.name}
                >
                  {author.name}
                </span>
              )}
            </Fragment>
          ))}
        </address>
      )}

      {0 < imageCredit.length && (
        <div className={theme.imageCredit}>
          <h3 className={theme.label}>{__('Image', 'mittr')}</h3>
          <span className={theme.item}>{imageCredit}</span>
        </div>
      )}

    </footer>
  );
};

ContentFooter.defaultProps = {
  imageCredit: '',
};

ContentFooter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  })).isRequired,
  theme: PropTypes.shape({
    author: PropTypes.string,
    label: PropTypes.string,
    social: PropTypes.string,
    tags: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
  imageCredit: PropTypes.string,
};

export default withThemes('content-footer', {
  default: styles,
  infeed: infeedTheme,
  inline: inlineTheme,
})(withStyles(styles, infeedTheme, inlineTheme)(ContentFooter));
