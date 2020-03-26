import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AdSlot, DFPManager } from 'react-dfp'; // eslint-disable-line
import kebabCase from 'lodash/kebabCase';
import useHideAds from 'hooks/useHideAds';
import styles from './adUnit.css';

const AdUnit = (props) => {
  const {
    adUnit,
    index,
    onSlotRender,
    shouldLoad,
    sizeMapping,
    sizes,
  } = props;
  const [loaded, setLoaded] = useState(false);
  const id = kebabCase(`${adUnit}-${index}`);
  const defaultOnSlotRender = (data) => {
    // Call any custom onSlotRender logic.
    onSlotRender(data);
    const { event } = data;

    // Detect when ad has loaded/rendered.
    if (
      event.slot &&
      ! event.isEmpty &&
      event.slot.getAdUnitPath().includes(adUnit)
    ) {
      setLoaded(true);
    }
  };

  const hideAds = useHideAds();
  useEffect(() => {
    if (shouldLoad && ! loaded && ! hideAds) {
      // DFPManager.load(id);
    }
  }, [shouldLoad]);

  return (
    <div
      loaded={loaded.toString()}
      className={classNames('adUnit', styles.wrapper)}
    >
      <AdSlot
        adUnit={adUnit}
        className={kebabCase(adUnit)}
        slotId={id}
        sizeMapping={sizeMapping}
        sizes={sizes}
        onSlotRender={defaultOnSlotRender}
      />
    </div>
  );
};

AdUnit.defaultProps = {
  onSlotRender: () => {},
  index: 1,
};

AdUnit.propTypes = {
  /**
   * Ad unit as defined in GAM.
   */
  adUnit: PropTypes.string.isRequired,
  /**
   * Index of this unit as it appears on the page.
   * Should be incremented if more than one of this unit will appear in the DOM at once.
   */
  index: PropTypes.number,
  /**
   * Function to trigger once the slot has rendered.
   */
  onSlotRender: PropTypes.func,
  /**
   * Whether or not this ad should load. Defaults to true so it loads immediately.
   */
  shouldLoad: PropTypes.bool.isRequired,
  /**
   * Ad manager sizeMapping property.
   */
  sizeMapping: PropTypes.array.isRequired,
  /**
   * Available sizes for this unit.
   */
  sizes: PropTypes.array.isRequired,
};

export default AdUnit;
