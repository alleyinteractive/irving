import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import get from 'lodash/get';
import checkUIComponentType from 'services/checkUIComponentType';
import { getZephrComponents } from 'selectors/zephrRulesSelector';

import ToggleNotice from 'components/toggleNotice';
import DismissNotice from 'components/dismissNotice';
import UIComponent from 'components/zephrUI/components/UIComponent';
import GTMContext from 'components/googleTagManager';

// Styles
import styles from './overlayFooter.css';

/**
 * Show any UIComponents that should appear in the overlayFooter region.
 *
 * @param {string} components The object of all zephrComponents from the store.
 */
const OverlayFooter = ({ components }) => {
  // Select the markup from the components object.
  const componentMarkup = get(
    components,
    'overlayFooter.zephrOutput.data',
    false
  );

  // Show nothing if there is no component in this rule.
  if (! componentMarkup) {
    return null;
  }

  // Get the pushEvent from the Google Tag Manager
  const { pushEvent } = useContext(GTMContext);

  // If it is a meter notice, then return component with toggle functionality.
  if (checkUIComponentType(componentMarkup, 'MeterNotice')) {
    pushEvent('zephr.meterView');

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
