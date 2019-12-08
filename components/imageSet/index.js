import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Image from '../image/image';

import styles from './imageSet.css';

const ImageSet = ({ images, caption }) => (
  <div className="imageSet__wrap">
    {images.map((image) => (
      <Image
        src={image.src}
        picture={false}
      />
    ))}
    <figcaption className="imageSet__caption">
      {caption}
    </figcaption>
  </div>
);

ImageSet.defaultProps = {
  caption: 'string',
};

ImageSet.propTypes = {
  caption: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({}))
    .isRequired,
};

export default withStyles(styles)(ImageSet);
