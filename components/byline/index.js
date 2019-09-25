import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';

// Styles
import styles from './byline.css';

const Byline = (props) => {
  const {
    name,
    link,
  } = props;

  return (
    <div className={styles.wrapper}>
      {__('by ', 'mittr')}
      {link ? (
        <Link
          className={styles.name}
          to={link}
        >
          {name}
        </Link>
      ) : (
        <span className={styles.name}>{name}</span>
      )}
    </div>
  );
};

Byline.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Byline;
