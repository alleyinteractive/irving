import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import get from 'lodash/get';
import sanitizeHtml from 'sanitize-html';
import { getZephrComponents } from 'selectors/zephrRulesSelector';

// Styles from UI components that may be included in this rule.
// Note they must be included manually in this component, as the HTML will be
// included directly using the Zephr feature rules.
import 'components/zephrUI/components/meterNotice/meterNotice.css';

// Styles
import styles from './overlayFooter.css';

const OverlayFooter = ({ components }) => {
  const componentMarkup = get(
    components,
    'overlayFooter.zephrOutput.data',
    false
  );
  debugger; // eslint-disable-line
  // We want to collapse and toggle the component in this region based on a user interaction.
  // If a component is served that does not have a call to action button, show a dismiss button.
  // We need a collapsable UI component and we need a dismissable UI component.

  // If it is a meter notice, then return component with toggle functionality.
  // -- create a component that holds the toggle functionality (should live outside the Zephr folder since it has no Zephr logic).
  // If it is a thank you notice (this is one we have to create), return component with dismiss functionality.
  // If it has dismiss functionality, then never show the component again once it has been dismissed.

  // if component = meterNotice then <ToggleNotice>{/* div that dangerously sets componentMarkup html inside it */}</ToggleNotice>
  // if component = thankyouNotice then <DismissNotice>{/* div that dangerously sets componentMarkup html inside it */}</DismissNotice>
  return (
    <>
      {componentMarkup && (
        <div className={styles.wrapper}>
          <div
            dangerouslySetInnerHTML={// eslint-disable-line react/no-danger
              {
                __html: sanitizeHtml(
                  componentMarkup,
                  {
                    allowedTags: [
                      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p',
                      'a', 'ul', 'ol',
                      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code',
                      'hr', 'br', 'div',
                      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
                      'pre', 'iframe', 'span',
                    ],
                    allowedAttributes: {
                      '*': [
                        'class',
                        'style',
                        'role',
                        'aria-live',
                        'aria-polite',
                        'aria-modal',
                      ],
                    },
                  }
                ),
              }
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

