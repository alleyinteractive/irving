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
      <span className={styles.by}>
        {__('by ', 'mittr')}
      </span>
      {authors.map((author, index, arr) => (
        <div className={styles.author} key={author.name}>
          <span className={styles.and}>
            {((index < arr.length) && (0 !== index)) && (
              <span>
                {__('and', 'mittr') }
              </span>
            )
            }
          </span>
          <Link to={author.link} className={styles.name}>{author.name}</Link>
        </div>
      ))}
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
