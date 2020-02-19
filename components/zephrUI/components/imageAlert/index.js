import React from 'react';
import PropTypes from 'prop-types';

import './imageAlert.css';

const ImageAlert = ({
  smallText,
  largeText,
  callToActionPrimaryDestination,
  callToActionPrimaryText,
  callToActionSecondaryDestination,
  callToActionSecondaryText,
  imageSrc,
}) => (
  <div
    role="dialog"
    aria-live="polite"
    aria-modal="true"
    className="ImageAlert"
  >
    <div className="ImageAlert__wrapper">
      <h1 className="screen-reader-text" tabIndex="-1">
        Content meter notice
      </h1>
      <div className="ImageAlert__fields">
        <h2 className="ImageAlert__slug">
          {smallText}
        </h2>
        <p className="ImageAlert__message">
          {largeText}
        </p>
        <a
          href={callToActionPrimaryDestination}
          className="ImageAlert__btn ImageAlert__btn--subscribe"
        >
          {callToActionPrimaryText}
        </a>
        <a
          href={callToActionSecondaryDestination}
          className="ImageAlert__btn ImageAlert__btn--signin"
        >
          {callToActionSecondaryText}
        </a>
      </div>
      <div className="ImageAlert__image">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  </div>
);

ImageAlert.propTypes = {
  /** The first line of text in the modal. */
  smallText: PropTypes.string.isRequired,
  /** Second, larger line of text in the modal. */
  largeText: PropTypes.string.isRequired,
  /** URL for the destination of the large yellow button. */
  callToActionPrimaryDestination: PropTypes.string.isRequired,
  /** Text for the large yellow button. */
  callToActionPrimaryText: PropTypes.string.isRequired,
  /** URL fo the destination of the second link. */
  callToActionSecondaryDestination: PropTypes.string.isRequired,
  /** Text for the second link. */
  callToActionSecondaryText: PropTypes.string.isRequired,
  /** Src of the image to be included in the component. */
  imageSrc: PropTypes.string.isRequired,
};

export default ImageAlert;
