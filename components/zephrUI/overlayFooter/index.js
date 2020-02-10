import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import get from 'lodash/get';
import sanitizeHtml from 'sanitize-html';
import { getZephrComponents } from 'selectors/zephrRulesSelector';

// Styles
import styles from './overlayFooter.css';

const OverlayFooter = ({ components }) => {
  const componentMarkup = get(
    components,
    'overlayFooter.zephrOutput.data',
    false
  );
  return (
    <>
      {componentMarkup && (
        <div className={styles.wrapper}>
          <div
            dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
              { __html: sanitizeHtml(componentMarkup) }
            }
          />
        </div>
      )
      }
    </>
  );
};

OverlayFooter.defaultProps = {
  components: {},
};

OverlayFooter.propTypes = {
  components: PropTypes.object,
};

const mapStateToProps = (state) => ({
  components: getZephrComponents(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(withStyles(styles)(OverlayFooter));

