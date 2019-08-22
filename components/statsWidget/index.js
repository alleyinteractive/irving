import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './statsWidget.css';

const StatsWidget = (props) => {
  const { title } = props;
  const { description } = props;
  return (
    <aside className={styles.stat}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>
        {description}
      </p>
    </aside>
  );
};

StatsWidget.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(StatsWidget);
