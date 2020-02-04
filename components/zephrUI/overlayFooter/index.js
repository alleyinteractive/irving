import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import sanitizeHtml from 'sanitize-html';
import get from 'lodash/get';

// Styles
import styles from './overlayFooter.css';

const OverlayFooter = withData(
  `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents`,
  {
    loading: () => (null),
  }
)(
  ({ data }) => {
    const componentMarkup = get(
      data,
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
  }
);

export default withStyles(styles)(OverlayFooter);

