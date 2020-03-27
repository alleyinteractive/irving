import React, { useState, useEffect, useContext } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import get from 'lodash/get';
import checkUIComponentType from 'services/checkUIComponentType';
import { getZephrComponents } from 'selectors/zephrRulesSelector';
import useZephrDataLayer from 'hooks/useZephrDataLayer';

import ToggleNotice from 'components/toggleNotice';
import DismissNotice from 'components/dismissNotice';
import UIComponent from 'components/zephrUI/components/UIComponent';
import { GTMContext } from 'components/googleTagManager'; // eslint-disable-line

// Styles
import styles from './overlayFooter.css';

/**
 * Show any UIComponents that should appear in the overlayFooter region.
 *
 * @param {string} components The object of all zephrComponents from the store.
 */
const OverlayFooter = ({ components }) => {
  const [hasPushedAnalyticsEvent, setHasPushedAnalyticsEvent] = useState(false);

  // Get the pushEvent from the Google Tag Manager.
  const { pushEvent } = useContext(GTMContext) || {};

  // Select the markup from the components object.
  const componentMarkup = get(
    components,
    'overlayFooter.zephrOutput.data',
    false
  );

  // Get the zephrDataLayer from the store.
  const zephrDataLayer = useZephrDataLayer();

  useEffect(() => {
    // Bail if already sent analytics on this pageview.
    if (hasPushedAnalyticsEvent) {
      return;
    }

    // Send a meterView event on the MeterNotice component.
    if (checkUIComponentType(componentMarkup, 'MeterNotice')) {
      pushEvent('zephr.meterView', ...zephrDataLayer);
      setHasPushedAnalyticsEvent(true);
      return;
    }

    // Send a paywall event on the ThanksNotice component.
    if (checkUIComponentType(componentMarkup, 'ThanksNotice')) {
      pushEvent('zephr.paywallView', ...zephrDataLayer);
      setHasPushedAnalyticsEvent(true);
    }
  }, [componentMarkup]);

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
};

const mapStateToProps = (state) => ({
  components: getZephrComponents(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(withStyles(styles)(OverlayFooter));
