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
import useScrollPosition from 'hooks/useScrollPosition';
import useObscureContent from 'hooks/useObscureContent';
import CloseIcon from 'assets/icons/close.svg';
import { findChildByName } from 'utils/children';
import useHideAds from 'hooks/useHideAds';
import styles from './sliderAd.css';

const SliderAd = ({ children }) => {
  const adUnit = findChildByName('ad-unit', children);
  const adRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isVisible = useSelector((state) => state.visible.sliderAd);
  const hasClosed = useSelector((state) => state.visible.sliderAdHasClosed);
  const dispatch = useDispatch();
  const hideAds = useHideAds();
  const obscureContent = useObscureContent();
  // Show nothing if we are supposed to hide ads.
  if (hideAds) {
    return null;
  }

  // Save visiblity and has closed info in redux store.
  const toggleVisibility = (value) => {
    dispatch(actionUpdateVisibility('sliderAd', value));
  };
  const setHasClosed = () => {
    dispatch(actionUpdateVisibility('sliderAdHasClosed', true));
  };

  // Show the ad if the ad slot has rendered and there's no meter modal.
  const showAd = () => {
    if (shouldLoad && ! obscureContent) {
      toggleVisibility(true);
    }
  };

  // Hide the ad.
  const closeAd = () => {
    toggleVisibility(false);
    setHasClosed();
  };

  // Set 5 second timer once user has scrolled 100px,
  // if the ad has not already been closed
  const scrollData = useScrollPosition();
  useEffect(() => {
    if (
      100 < scrollData.y &&
      ! hasClosed
    ) {
      setTimeout(() => showAd(), 5000);
    }
  }, [scrollData]);

  // Detect and setShouldLoad once slot has rendered.
  const onSlotRender = (data) => {
    const { event } = data;
    if (
      event.slot &&
      ! event.isEmpty &&
      event.slot.getAdUnitPath().includes('__slider') &&
      adRef.current
    ) {
      setShouldLoad(true);
    }
  };

  return (
    <div className={classNames(
      styles.wrapper,
      {
        [styles.isVisible]: isVisible,
        [styles.isHidden]: hasClosed,
      }
    )}
    >
      <button
        className={styles.closeButton}
        onClick={closeAd}
        type="button"
      >
        <span className={styles.closeText}>hide</span>
        <span className={styles.closeIcon}>
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default SliderAd;
