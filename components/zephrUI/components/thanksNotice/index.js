import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './thanksNotice.css';

const ThanksNotice = (props) => {
  const { name, smallText } = props;
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      className="ThanksNotice__wrapper"
    >
      <div
        className="ThanksNotice__innerWrapper"
      >
        <h1 className="screen-reader-text" tabIndex="-1">
          Subscription thank you
        </h1>
        <p className="ThanksNotice__smallText">
          {smallText}
        </p>
        <p className="ThanksNotice__largeText">
          {'Thanks for reading Tech Review, '}
          <span>{name}</span>
        </p>
      </div>
    </div>
  );
};

ThanksNotice.propTypes = {
  name: PropTypes.arrayOf(PropTypes.element).isRequired,
  smallText: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ThanksNotice;

