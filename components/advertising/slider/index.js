import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import { debounce } from 'lodash';
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
  const isVisible = useSelector((state) => state.visible.sliderAd);
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
  const [scrollData, setScrollData] = useState({
    x: 0,
    y: 0,
    direction: '',
  });

  const getScrollPosition = () => {
    const position = document.body.getBoundingClientRect();
    setScrollData((prev) => ({
      x: position.left,
      y: - position.top,
      direction: - position.top < prev.y ? 'up' : 'down',
    }));
  };

  useEffect(() => {
    document.addEventListener('scroll', debounce(() => {
      getScrollPosition();
    }, 50));
  }, []);

  useEffect(() => {
    setScrollData({
      x: document.body.getBoundingClientRect().left,
      y: - document.body.getBoundingClientRect().top,
      ...scrollData,
    });
  }, []);

  useEffect(() => {
    if (100 < scrollData.y && ! hasClosed) {
      setTimeout(() => toggleVisibility(true), 5000);
    }
  }, [scrollData]);

  // Detect and set height once slot has rendered.
  const onSlotRender = (data) => {
    const { event } = data;
    if (
      event.slot &&
      ! event.isEmpty &&
      event.slot.getAdUnitPath().includes('__slider') &&
      adRef.currentv
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
  enableToggle: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

SliderAd.defaultProps = {
  enableToggle: true,
};

export default SliderAd;
