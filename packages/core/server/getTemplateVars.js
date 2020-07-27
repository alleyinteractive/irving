import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  getValueFromConfigNoMemo,
} from 'config/irving/getValueFromConfig';

/**
 * Retrieve configured variables for a given express template (app or error)
 *
 * @param {string} key Key for configured functions for getting template vars.
 * @param {object} initialVars Variables passed in from serverRenderer
 */
export default function getTemplateVars(key, initialVars) {
  const customTemplateVars = getValueFromConfigNoMemo(key, initialVars);
  const {
    Wrapper,
    head,
  } = customTemplateVars;

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  customTemplateVars.appHtml = renderToString(<Wrapper />);

  return {
    ...customTemplateVars,
    head: Object.keys(head)
      .reduce((acc, headKey) => {
        const val = head[headKey];
        let newVal = val;

        if (Array.isArray(val)) {
          // Call any functions in this array (they should return strings)
          newVal = val.map((curr) => {
            if ('function' === typeof curr) {
              return curr();
            }

            return curr;
          }).join('');
        }

        return {
          ...acc,
          [headKey]: newVal,
        };
      }, {}),
  };
}
