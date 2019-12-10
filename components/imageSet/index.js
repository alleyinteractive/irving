import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { withStyles } from 'critical-style-loader/lib';

import styles from './imageSet.css';

const ImageSet = ({ children, layout }) => (
  <div className={className('imageSet__wrap', layout)}>
    {children}
  </div>
);

ImageSet.defaultProps = {
  layout: '',
};

ImageSet.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  layout: PropTypes.string,
};

export default withStyles(styles)(ImageSet);
