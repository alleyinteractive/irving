import React from 'react';
import { renderToString } from 'react-dom/server';
import { mergeConfigValues } from 'config/irving/mergeConfigValues';
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

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const { Wrapper } = customTemplateVars;
  customTemplateVars.appHtml = renderToString(<Wrapper />);

  // Call any template vars that are functions.
  return Object.keys(customTemplateVars).reduce((acc, templateVar) => {
    const value = customTemplateVars[templateVar];
    const initial = initialVars[templateVar] || [];

    // These have already been handled above.
    if ('Wrapper' === templateVar || 'appHtml' === templateVar) {
      return { ...acc, [templateVar]: value };
    }

    return {
      ...acc,
      [templateVar]: mergeConfigValues(value, initial),
    };
  }, {});
}
