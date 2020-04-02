import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import useScrollPosition from 'hooks/useScrollPosition';
import {
  actionUpdateVisibility,
} from 'actions';
import checkUIComponentType from 'services/checkUIComponentType';
import { getZephrComponents } from 'selectors/zephrRulesSelector';
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
  const zephrComponents = useSelector((state) => getZephrComponents(state));
  const dispatch = useDispatch();
  const hideAds = useHideAds();

  // Show nothing if we are supposed to hide ads.
  if (hideAds) {
    return null;
  }

  // Select the markup from the components object.
  const componentMarkup = get(
    zephrComponents,
    'overlayFooter.zephrOutput.data',
    false
  );

  const toggleVisibility = (value) => {
    dispatch(actionUpdateVisibility('sliderAd', value));
  };
  const setHasClosed = () => {
    dispatch(actionUpdateVisibility('sliderAdHasClosed', true));
  // Show the ad if there's no meter, and the ad slot has rendered.
  const showAd = () => {
    if (
      shouldLoad &&
      ! checkUIComponentType(componentMarkup, 'MeterNotice')
    ) {
      toggleVisibility(true);
    }
  };
  const closeAd = () => {
    toggleVisibility(false);
    setHasClosed();
  };

  const scrollData = useScrollPosition();

  useEffect(() => {
    if (
      100 < scrollData.y &&
      ! hasClosed
    ) {
      setTimeout(() => showAd(), 5000);
    }
  }, [scrollData]);

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
