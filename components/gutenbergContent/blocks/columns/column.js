import React from 'react';
import PropTypes from 'prop-types';
import styles from './columns.css';

const Column = (props) => {
  const { children } = props;

  return (
    <div className="wp-block-column">
      {children.map((child) => (
        React.cloneElement(child, { className: styles.content })
      ))}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};

export default Column;
