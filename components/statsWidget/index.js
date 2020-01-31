import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './statsWidget.css';

const StatsWidget = (props) => {
  const { title, description } = props;
  if (! title && ! description) {
    return null;
  }
  return (
    <aside className="statsWidget__stat">
      <h2 className="statsWidget__title">{title}</h2>
      <p className="statsWidget__description">
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
