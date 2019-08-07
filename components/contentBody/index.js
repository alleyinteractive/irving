import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/helpers/container';
import { withStyles } from 'critical-style-loader/lib';
import styles from './contentBody.css';

const ContentBody = (props) => {
  const { children } = props;

  return <Container className={styles.wrapper}>{children}</Container>;
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentBody);
