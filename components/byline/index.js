import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';

// Styles
import styles from './byline.css';

const Byline = (props) => {
  const {
    authors,
  } = props;

  return (
    <div className={styles.wrapper}>
      <span className={styles.by} aria-hidden>
        {__('by ', 'mittr')}
      </span>
      <ul className={styles.list} aria-label={__('Authors', 'mittr')}>
        {authors.map((author) => (
          <li className={styles.author} key={author.name}>
            <Link to={author.link} className={styles.name}>
              {author.name}
              {' '}
              <span className="screen-reader-text">
                {__('archive page', 'mittr')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Byline.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
  })).isRequired,
};

export default Byline;
