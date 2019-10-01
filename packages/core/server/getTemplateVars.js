import React from 'react';
import { renderToString } from 'react-dom/server';

/**
 *
 * @param {array} getters Functions for getting template vars, sourced from both user config and packages
 * @param {object} initialVars Variables passed in from serverRenderer
 */
export default function getTemplateVars(getters, initialVars) {
  // Loop through all getters and call them with merged templateVars.
  const customTemplateVars = getters.reduce(
    (acc, getVars) => ({
      ...acc,
      ...getVars(acc),
    }),
    initialVars
  );

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
