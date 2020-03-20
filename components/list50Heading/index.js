import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/helpers/heading';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './list50Heading.css';

const List50Heading = (props) => {
  const {
    content,
  } = props;

  return (
    <Heading
      tag="h3"
      className={styles.heading}
    >
      {content}
    </Heading>
  );
};

List50Heading.propTypes = {
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(List50Heading);
