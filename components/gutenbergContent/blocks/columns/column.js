import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './columns.css';

const Column = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { children, className, width } = props;

  return (
    <div
      className={classNames('wp-block-column', className)}
      style={{ width: `${width}%`, maxWidth: `${width}%` }}
    >
      {children.map((child) => (
        React.cloneElement(child, { className: styles.content })
      ))}
    </div>
  );
};

Column.defaultProps = {
  className: '',
  width: '',
};

Column.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Column;
