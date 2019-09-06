import React from 'react';
import PropTypes from 'prop-types';
import { findChildByName, filterChildrenByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './contentFooter.css';

const ContentFooter = ({ children, author }) => {
  const socialSharing = findChildByName('social-sharing', children);
  const tags = filterChildrenByName('tags', children);
  return (
    <footer className={styles.wrapper}>
      <h2 className={styles.title}>{__('Article meta', 'mittr')}</h2>
      <div className={styles.social}>{socialSharing}</div>
      {tags && (
        <div className={styles.tags}>
          <h3 className={styles.label}>{__('Tagged', 'mittr')}</h3>
          {tags}
        </div>
      )}
      <address className={styles.author}>
        <h3 className={styles.label}>{__('Author', 'mittr')}</h3>
        {/* @todo this needs an image */}
        <Link to={author.url}>{author.name}</Link>
      </address>
    </footer>
  );
};

ContentFooter.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContentFooter;
