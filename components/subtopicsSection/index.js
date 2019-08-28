import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './subtopicsSection.css';

const SubtopicsSection = (props) => {
  const { topic } = props;
  const { children: subtopics } = props;
  return (
    <div className={styles.channel}>
      <h5 className={styles.label}>
        {/* eslint-disable-next-line max-len */}
          What matters in <span className={styles.name}>{topic}</span> right now?
      </h5>
      <div className={styles.listContainer}>
        <ul className={styles.list}>{subtopics}</ul>
      </div>
    </div>
  );
};

SubtopicsSection.propTypes = {
  topic: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SubtopicsSection);
