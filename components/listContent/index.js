import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listContent.css';

const ListContent = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.wrapper}>
      <ul className="postList__list">
        {(children && children.length) && children.map((child, index) => (
          <li>
            {index}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ListContent);
