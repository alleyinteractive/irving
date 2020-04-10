import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { zephrDataLayerSelector } from 'selectors/zephrDataLayerSelector';
import checkUIComponentType from 'services/checkUIComponentType';
import { getZephrComponents } from 'selectors/zephrRulesSelector';
import { GTMContext } from 'components/googleTagManager';
import zephrExtractScope from 'utils/zephrExtractScope';

import ToggleNotice from 'components/toggleNotice';
import DismissNotice from 'components/dismissNotice';
import UIComponent from 'components/zephrUI/components/UIComponent';

// Styles
import styles from './overlayFooter.css';

/**
 * Show any UIComponents that should appear in the overlayFooter region.
 *
 * @param {string} components The object of all zephrComponents from the store.
 */
const OverlayFooter = ({ components, zephrDataLayer }) => {
  const { pushEvent } = useContext(GTMContext);

  // Select the markup from the components object.
  const componentMarkup = get(
    components,
    'overlayFooter.zephrOutput.data',
    false
  );

  useEffect(() => {
    const { isLoading, dataLayer: zephrDataLayerResults } = zephrDataLayer;

    // Bail early if required conditions are not met.
    if (
      isLoading ||
      ! componentMarkup ||
      'object' !== typeof zephrDataLayerResults
    ) {
      return;
    }

    const {
      meterChangedThisRequest = true,
      usedCredits = zephrDataLayerResults.usedCredits,
      totalMeter = 3,
    } = zephrExtractScope(componentMarkup);

    const remainingCredits = totalMeter - usedCredits;

    // Send a meterView event on the MeterNotice component.
    if (checkUIComponentType(componentMarkup, 'MeterNotice')) {
      // If a reread, push this event.
      if (! meterChangedThisRequest) {
        pushEvent(
          'zephr.meterViewReread',
          { ...zephrDataLayerResults, usedCredits, remainingCredits }
        );
      } else {
        // Otherwise, push new meterView event.
        pushEvent(
          'zephr.meterView',
          { ...zephrDataLayerResults, usedCredits, remainingCredits }
        );
      }

      return;
    }

    // Send a paywall event on the ImageAlert component.
    if (checkUIComponentType(componentMarkup, 'ImageAlert')) {
      pushEvent('zephr.paywallView', zephrDataLayerResults);
    }
  }, [zephrDataLayer, componentMarkup]);

  // Show nothing if there is no component in this rule.
  if (! componentMarkup) {
    return null;
  }

  // If it is a meter notice, then return component with toggle functionality.
  if (checkUIComponentType(componentMarkup, 'MeterNotice')) {
    return (
      <div className={styles.wrapper}>
        <ToggleNotice>
          <UIComponent componentMarkup={componentMarkup} />
        </ToggleNotice>
      </div>
    );
  }

  // If it is a thank you notice, return component with dismiss functionality.
  if (checkUIComponentType(componentMarkup, 'ThanksNotice')) {
    return (
      <div className={styles.wrapper}>
        <DismissNotice>
          <UIComponent componentMarkup={componentMarkup} />
        </DismissNotice>
      </div>
    );
  }

  // Default case, just stick the markup inside the region.
  return (
    <div className={styles.wrapper}>
      <UIComponent componentMarkup={componentMarkup} />
    </div>
  );
};

OverlayFooter.defaultProps = {
  components: {},
};

OverlayFooter.propTypes = {
  /** Object consisting of all the ZephrComponents that may be transformed. */
  components: PropTypes.object,
  /** Variables from the Zephr analytics layer. */
  zephrDataLayer: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    dataLayer: PropTypes.shape({
      loggedIn: PropTypes.bool,
      UserId: PropTypes.string,
      remainingCredits: PropTypes.number,
      usedCredits: PropTypes.number,
      hasDigitalAccess: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  components: getZephrComponents(state),
  zephrDataLayer: zephrDataLayerSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(withStyles(styles)(OverlayFooter));
