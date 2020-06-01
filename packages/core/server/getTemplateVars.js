import React from 'react';
import { renderToString } from 'react-dom/server';
import { getConfigFromProject } from 'config/getConfigFromProject';

/**
 *
 * @param {string} key Key for configured functions for getting template vars.
 * @param {object} initialVars Variables passed in from serverRenderer
 */
export default function getTemplateVars(key, initialVars) {
  const customTemplateVars = getConfigFromProject(key, initialVars);

  // Delete Wrapper and renderToString.
  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const AppWrapper = customTemplateVars.Wrapper;
  delete customTemplateVars.Wrapper;
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
