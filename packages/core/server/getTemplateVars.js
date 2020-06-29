import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  getValueFromConfigNoMemo,
} from 'config/irving/getValueFromConfig';

/**
 *
 * @param {string} key Key for configured functions for getting template vars.
 * @param {object} initialVars Variables passed in from serverRenderer
 */
export default function getTemplateVars(key, initialVars) {
  const customTemplateVars = getValueFromConfigNoMemo(key, initialVars);

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const AppWrapper = customTemplateVars.Wrapper;
  customTemplateVars.appHtml = renderToString(<AppWrapper />);

  // Call any template vars that are functions.
  return Object.keys(customTemplateVars).reduce((acc, templateVar) => {
    const value = customTemplateVars[templateVar];

    return {
      ...acc,
      [templateVar]: 'function' === typeof value ? value() : value,
    };
  }, {});
}
