import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './image.css';

class IrvingImg extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidMount() {
    const { onLoad } = this.props;

    if (this.imgRef.current.complete) {
      onLoad();
    }
  }

  render() {
    const {
      alt,
      sizes,
      src,
      srcset,
      onLoad,
      onError,
    } = this.props;

    return (
      <img
        alt={alt}
        className={styles.img}
        ref={this.imgRef}
        src={src}
        srcSet={srcset || null}
        sizes={sizes || null}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
}

IrvingImg.propTypes = {
  srcset: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

IrvingImg.defaultProps = {
  sizes: '',
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(IrvingImg);
