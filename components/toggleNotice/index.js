import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './toggleNotice.css';

const ToggleNotice = (props) => {
  const [meterIsVisible, setMeterIsVisible] = useState(true);
  const { children } = props;
  return (
    <div className={styles.wrapper}>
      <div
        aria-expanded={meterIsVisible}
      >
        {children}
        <button
          aria-haspopup
          aria-expanded={meterIsVisible}
          className={styles.button}
          onClick={() => {
            setMeterIsVisible(! meterIsVisible);
          }}
          type="button"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

ToggleNotice.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default withStyles(styles)(ToggleNotice);

