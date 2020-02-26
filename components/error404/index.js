import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import styles from './error404.css';

const Error404 = (props) => {
  const {
    children,
    heading,
  } = props;

  const goBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.msg}>
        {heading}
        {__(' Try', 'mittr')}&nbsp;
        <Link to="/search/" className={styles.link}>
          {__('searching ', 'mittr')}
        </Link>
        {__('or ', 'mittr')}
        <button
          type="button"
          onClick={goBack}
          className={styles.link}
        >
          {__('go back.', 'mittr')}
        </button>
      </p>
      {children}
    </div>
  );
};

Error404.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Error404);
