import { omit } from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './placeholder.css';

const Placeholder = (props) => (
  <div className={styles.wrapper}>
    <h1 className={styles.heading}>{props.name}</h1>
    <pre>{JSON.stringify(omit(['name', 'children'], props), null, 2)}</pre>
    {props.children}
  </div>
);

Placeholder.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const wrapWithStyles = withStyles(styles);
export default wrapWithStyles(Placeholder);
