import React from 'react';
import PropTypes from 'prop-types';
import { findChildByName } from 'utils/children';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './contentFooter.css';

const ContentFooter = ({ children, tags, author }) => {
  const socialSharing = findChildByName('social-sharing', children);
  return (
    <footer className={styles.wrapper}>
      <h2 className={styles.title}>{__('Article meta', 'mittr')}</h2>
      <div className={styles.social}>{socialSharing}</div>
      {tags && (
        <div className={styles.tags}>
          <h3 className={styles.label}>{__('Tagged', 'mittr')}</h3>
          <ul>
            {tags.map((tag) => (
              // @todo MIT-183 update the API use react links for these instead.
              // eslint-disable-next-line react/no-danger
              <li key={tag} dangerouslySetInnerHTML={{ __html: tag }} />
            ))}
          </ul>
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
  tags: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

ContentFooter.defaultProps = {
  tags: [],
};

export default ContentFooter;
