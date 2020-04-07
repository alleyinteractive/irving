import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import queryString from 'query-string';

// Styles from UI components that may be included in this rule.
// Note they must be included manually in this component, as the HTML will be
// included directly using the Zephr feature rules.
import './meterNotice/meterNotice.css';
import './thanksNotice/thanksNotice.css';
import './imageAlert/imageAlert.css';

/**
 * Executes a use callback hook to update all links within the component to add
 * a `redirectTo` parameter so that following these links will enable the
 * user to return to the location where they first followed the call to action
 * funnel.
 */
const addRedirectParamsToLinks = () => {
  const ref = useRef(null);

  const setRefToLinksContainer = useCallback((node) => {
    if (ref.current) {
      // Do not execute after initial load.
      return;
    }

    if (node) {
      // Get the window location.
      const {
        location: {
          pathname = '',
        } = {},
      } = window;

      // Get all the links in this component.
      const links = node.querySelectorAll('a');

      Array.from(links).forEach((link) => {
        // Get link destination.
        const { href } = link;

        // Pull existing query params from link.
        const { query: existingQueryParams } = queryString.parseUrl(href);

        // Combine query params with redirectTo param.
        const newQueryString = queryString.stringify({
          ...existingQueryParams,
          redirectTo: pathname,
        });

        // Update link destination. Param assign OK as updating a ref.
        link.href = `${link.href}?${newQueryString}`; // eslint-disable-line no-param-reassign
      });
    }

    // Save a reference to the node.
    ref.current = node;
  });

  return [setRefToLinksContainer];
};

/**
 * Takes a transformed string from the Zephr response and creates an HTML
 * element to display its value.
 */
const UIComponent = ({ componentMarkup }) => {
  const [ref] = addRedirectParamsToLinks();

  return (
    <div
      ref={ref}
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
                'pre', 'iframe', 'span', 'img',
              ],
              allowedAttributes: {
                '*': [
                  'class',
                  'style',
                  'role',
                  'aria-live',
                  'aria-polite',
                  'aria-modal',
                  'alt',
                  'src',
                  'href',
                  'data-scope',
                ],
              },
            }
          ),
        }
      }
    />
  );
};

UIComponent.propTypes = {
  /** The markup transformed in the Zephr rule. */
  componentMarkup: PropTypes.string.isRequired,
};

export default UIComponent;
