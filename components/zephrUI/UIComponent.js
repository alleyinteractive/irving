import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

/**
 * Takes a transformed string from the Zephr response and creates an HTML
 * element to display its value.
 */
const UIComponent = ({ componentMarkup }) => (
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
);

UIComponent.propTypes = {
  /** The markup transformed in the Zephr rule. */
  componentMarkup: PropTypes.string.isRequired,
};

export default UIComponent;
