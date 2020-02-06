import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// Styles
import styles from './podcastList.css';

const PodcastList = ({
  children,
}) => (
  <ul className={styles.wrapper}>
    {children.map((child, idx) => {
      const index = idx + 1;

      if (0 === idx) {
        return (
          <>
            <hr className="rowDivider rowDivider--top" />
            {React.cloneElement(child)}
          </>
        );
      }

      if (0 === index % 3) {
        return (
          <>
            {React.cloneElement(child, { className: 'rowEnd--3up' })}
            <hr className="rowDivider rowDivider--3up" />
          </>
        );
      }

      if (0 === index % 2) {
        return (
          <>
            {React.cloneElement(child, { className: 'rowEnd--2up' })}
            <hr className="rowDivider rowDivider--2up" />
          </>
        );
      }

      return React.cloneElement(child);
    })}
  </ul>
);

PodcastList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(PodcastList);
