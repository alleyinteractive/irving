import React, { Component, Fragment } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IrvingPicture from './picture';
import IrvingImg from './img';
import styles from './image.css';

class Image extends Component {
  state = {
    loaded: false,
    error: false,
  };

  onLoad = () => {
    this.setState({ loaded: true });
  };

  onError = () => {
    this.setState({ error: true });
  };

  render() {
    const {
      alt,
      aspectRatio,
      className,
      lazyload,
      lqipSrc,
      picture,
    } = this.props;
    const {
      loaded,
      error,
    } = this.state;
    const paddingPercentage = aspectRatio ?
      { paddingBottom: `${aspectRatio * 100}%` } :
      null;
    // Set up image element(s) for maybe using with lazyload component
    const imageContent = (
      <Fragment>
        {picture ? (
          <IrvingPicture
            {...this.props}
            onLoad={this.onLoad}
            onError={this.onError}
          />
        ) : (
          <IrvingImg
            {...this.props}
            onLoad={this.onLoad}
            onError={this.onError}
          />
        )}
      </Fragment>
    );
    // Set up placeholder image with low quality image placeholder source
    const placeholder = lqipSrc ?
      (
        <img
          className={styles.placeholder}
          src={lqipSrc}
          alt={alt}
        />
      ) :
      null;

    return (
      <span
        className={classNames(
          styles.wrapper,
          className,
          {
            [styles.apsectRatio]: aspectRatio,
            [styles.lazyload]: lazyload,
            [styles.loaded]: loaded,
            [styles.error]: error,
          }
        )}
        style={paddingPercentage}
      >
        {lazyload ?
          (
            <Fragment>
              {! loaded && <Fragment>{placeholder}</Fragment>}
              {imageContent}
            </Fragment>
          ) :
          imageContent
        }
      </span>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.oneOf(['auto']),
  ]).isRequired,
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  lazyload: PropTypes.bool.isRequired,
  lqipSrc: PropTypes.string.isRequired,
  picture: PropTypes.bool,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string.isRequired,
  sourceTags: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ),
};

Image.defaultProps = {
  sourceTags: [],
  className: '',
  picture: false,
  sizes: '',
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Image);

