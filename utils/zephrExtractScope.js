import get from 'lodash/get';

/**
 * Extract the data-scope attribute from component markup.
 *
 * @param {string} componentMarkup  A string containing an html component.
 *
 * @return {object}                 The parsed value of the object in the first
 *                                  element child's data-scope attribute.
 */
export default (componentMarkup) => {
  // Only works in client-side code.
  if ('undefined' === typeof DOMParser) {
    return {};
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(componentMarkup, 'text/html');

  if ('object' !== typeof doc.body) {
    return {};
  }

  const scopeString = get(
    doc,
    'body.firstChild.dataset.scope',
    '{}'
  );

  return JSON.parse(scopeString);
};
