import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Arrow from 'assets/icons/arrow.svg';

// Styles
import './meterNotice.css';

/**
 * Zephr UI component that shows the user how many articles they have left on
 * the meter and calls to action to subscribe.
 *
 * Always appears within the OverlayFooter feature rule.
 *
 * @visibleName Meter Notice
 */

const MeterNotice = ({
  callToActionDestination,
  callToActionText,
  currentCount,
  largeText,
  totalMeter,
}) => {
  const [meterIsVisible, setMeterIsVisible] = useState(true);

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      className="MeterNotice__wrapper"
    >
      <div
        className="MeterNotice__innerWrapper"
      >
        <h1 className="screen-reader-text" tabIndex="-1">
          Content meter notice
        </h1>
        <p className="MeterNotice__smallText">
          {'You\'ve read '}
          <span className="MeterNotice__count">{currentCount}</span>
          {' of '}
          <span className="MeterNotice__count">{totalMeter}</span>
        </p>
        <p className="MeterNotice__largeText">
          {largeText}
        </p>
        <ul
          className="MeterNotice__callsToAction"
          aria-label="Subscription options"
        >
          <li className="MeterNotice__item">
            <a
              href={callToActionDestination}
              className="MeterNotice__callToAction--button"
            >
              {callToActionText}
            </a>
          </li>
          <li className="MeterNotice__item">
            {'Already a subscriber? '}
            <a href="/login" className="MeterNotice__callToAction--link">
              Sign in
            </a>
            {'.'}
          </li>
        </ul>
      </div>
      <button
        aria-haspopup
        aria-expanded={meterIsVisible}
        className="MeterNotice__toggle"
        onClick={() => {
          setMeterIsVisible(! meterIsVisible);
        }}
        type="button"
      >
        <Arrow />
      </button>
    </div>
  );
};

MeterNotice.propTypes = {
  /** Destination of the large yellow button. */
  callToActionDestination: PropTypes.string.isRequired,
  /** Text of the large yellow button. */
  callToActionText: PropTypes.string.isRequired,
  /** Value of the current number of pageviews the user has made. */
  currentCount: PropTypes.string.isRequired,
  /** Large call to action text that will appear above the button and link. */
  largeText: PropTypes.string.isRequired,
  /** Value of the total number of metered articles. */
  totalMeter: PropTypes.string.isRequired,
};

export default MeterNotice;

