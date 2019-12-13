import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './columns.css';

const Column = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames('wp-block-column', className)}>
      {children.map((child) => (
        React.cloneElement(child, { className: styles.content })
      ))}
    </div>
  );
};

Column.defaultProps = {
  className: '',
};

Column.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
  className: PropTypes.string,
};

export default Column;
