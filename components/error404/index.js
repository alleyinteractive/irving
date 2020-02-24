import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/helpers/heading';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import styles from './error404.css';

const Error404 = (props) => {
  const {
    children,
    heading,
    link,
    msg,
  } = props;

  return (
    <div className={styles.wrapper}>
      <Heading
        className={styles.title}
        typeStyle="step-up-three"
        fontFamily="fira"
        tag="h1"
      >
        {heading}
      </Heading>
      <p className={styles.msg}>{msg}</p>
      {children}
      <Link to="/" className={styles.link}>
        {link}
      </Link>
    </div>
  );
};

Error404.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Error404);
