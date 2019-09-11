import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import RawHTML from 'components/rawHTML';

// Styles
import styles from './listGroup.css';

const ListGroup = ({ category, description, children }) => (
  <div className={styles.wrapper}>
    <header className={styles.meta}>
      <h2 className={styles.title} id={`list-group-${category}`}>
        {category}
      </h2>
      <RawHTML className={styles.description} content={description} />
    </header>
    <ul className={styles.list} aria-labelledby={`list-group-${category}`}>
      {children}
    </ul>
  </div>
);

ListGroup.propTypes = {
  category: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListGroup);
