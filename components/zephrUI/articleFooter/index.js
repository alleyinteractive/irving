import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import withData from 'components/hoc/withData';
import sanitizeHtml from 'sanitize-html';
import get from 'lodash/get';

// Styles
import styles from './articleFooter.css';

const ArticleFooter = withData(
  // `${process.env.ZEPHR_ROOT_URL}/wp-json/mittr/v1/zephrComponents`,
  'https://technologyreview-com-develop.go-vip.net/wp-json/mittr/v1/zephrComponents',
  {
    // @todo need to hide this component while loading.
    loading: () => (null),
  }
)(
  ({ data }) => {
    // const transformedKey = Object.keys(data)
    //   // Find the UI component that has a ruleset which has changed
    //   // lodash get
    //   .find((key) => undefined !== data[key].zephrOutput.data);
    // const { zephrOutput } = transformedKey ? data[transformedKey] : {};
    // const componentMarkup = zephrOutput ? zephrOutput.data : '';
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

export default withStyles(styles)(ArticleFooter);

