import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import Arrow from 'assets/icons/arrow.svg';

// Styles
import styles from './toggleNotice.css';

const ToggleNotice = ({ children }) => {
  const [noticeIsVisible, setNoticeIsVisible] = useState(true);
  return (
    <div className={classNames(styles.wrapper, {
      [styles.expanded]: noticeIsVisible,
      [styles.collapsed]: ! noticeIsVisible,
    })}
    >
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
      <div
        className={styles.notice}
        aria-expanded={noticeIsVisible}
      >
        {children}
      </div>
    </div>
  );
};

ToggleNotice.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(ToggleNotice);

