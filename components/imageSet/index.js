import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

import styles from './imageSet.css';

// eslint-disable-next-line no-unused-vars
const ImageSet = ({ children, layout }) => (
  <div className="imageSet__wrap">
    {children}
  </div>
);

ImageSet.defaultProps = {
  layout: 'diptych',
};

ImageSet.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  layout: PropTypes.string,
};

export default withStyles(styles)(ImageSet);
