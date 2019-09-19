import { renderToString } from 'react-dom/server';

/**
 *
 * @param {array} getters Functions for getting template vars, sourced from both user config and packages
 * @param {object} WrapperComponent React component for rendering the app (or error message)
 * @param {object} initialVars Variables passed in from serverRenderer
 */
export default function getTemplateVars(
  getters,
  WrapperComponent,
  initialVars,
) {
  // Loop through all getters and call them with merged templateVars.
  const customTemplateVars = getters.reduce(
    (acc, getVars) => getVars(WrapperComponent, acc),
    initialVars
  );

  return Object.keys(customTemplateVars).reduce((acc, templateVar) => {
    const value = customTemplateVars[templateVar];
    // Default to whatever value is provided.
    let result = value;

    if ('appHtml' === templateVar) {
      // Render app html to a string
      result = renderToString(value);
    } else if ('function' === typeof value) {
      // Call any function assuming it will return the value to be rendered.
      result = value();
    }

    return {
      ...acc,
      [templateVar]: result,
    };
  }, {});
}
