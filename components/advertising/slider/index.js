import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import {
  actionUpdateVisibility,
} from 'actions';
import CloseIcon from 'assets/icons/close.svg';
import { findChildByName } from 'utils/children';
import styles from './sliderAd.css';

const SliderAd = (props) => {
  const {
    enableToggle,
    children,
  } = props;
  const adUnit = findChildByName('ad-unit', children);
  const adRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isOpen = useSelector((state) => state.visible.sliderAd);
  const hasClosed = useSelector((state) => state.visible.sliderAdHasClosed);
  const dispatch = useDispatch();

  const toggleVisibility = (value) => {
    dispatch(actionUpdateVisibility('sliderAd', value));
  };
  const setHasClosed = () => {
    dispatch(actionUpdateVisibility('sliderAdHasClosed', true));
  };
  const closeAd = () => {
    toggleVisibility(false);
    setHasClosed();
  };

  if (! enableToggle) {
    return null;
  }

  // Conditions for slider ad visibility will go here.
  useEffect(() => {

  }, []);

  // Detect and set height once slot has rendered.
  const onSlotRender = (data) => {
    const { event } = data;
    if (
      event.slot &&
      ! event.isEmpty &&
      event.slot.getAdUnitPath().includes('__slider') &&
      adRef.current
    ) {
      setShouldLoad(true);
      toggleVisibility(true);
    }
  };

  return (
    <div className={classNames(
      styles.wrapper,
      { [styles.isVisible]: isOpen }
    )}
    >
      <button
        className={styles.toggle}
        onClick={closeAd}
        type="button"
      >
        <span className={styles.toggleText}>
          {isOpen ? ('hide') : ('show')}
        </span>
        <span className={classNames(
          styles.toggleCloseIcon,
          { [styles.hide]: ! isOpen }
        )}
        >
          <CloseIcon />
        </span>
      </button>
      {! hasClosed && (
        <div className={styles.adWrapper} ref={adRef}>
          {React.cloneElement(adUnit, {
            onSlotRender,
            shouldLoad,
          })}
        </div>
      )}
    </div>
  );
};

SliderAd.propTypes = {
  enableToggle: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SliderAd.defaultProps = {
  enableToggle: true,
};

export default SliderAd;
