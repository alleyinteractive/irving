import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './toggleNotice.css';

const ToggleNotice = ({ children }) => {
  const [noticeIsVisible, setNoticeIsVisible] = useState(true);
  return (
    <div className={styles.wrapper}>
      {/* @todo need to revisit if the aria messaging needs to be entirely in
      this component and outside of the UIComponent markup. Also need to add
      controls for the button. */}
      <div
        aria-expanded={noticeIsVisible}
      >
        {children}
        <button
          aria-haspopup
          aria-expanded={noticeIsVisible}
          className={styles.button}
          onClick={() => {
            setNoticeIsVisible(! noticeIsVisible);
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

