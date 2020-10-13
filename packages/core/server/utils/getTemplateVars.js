import React from 'react';
import { renderToString } from 'react-dom/server';
import omit from 'lodash/fp/omit';
import mergeWith from 'lodash/mergeWith';
import { getConfigValues } from 'config/irving/getValueFromConfig';

export const defaultHead = {
  htmlAttributes: [],
  bodyAttributes: [],
  start: [],
  title: [],
  meta: [],
  link: [],
  base: [],
  style: [],
  script: [],
  noscript: [],
  end: [],
};

/**
 * Check if a value is a function and, if so, call that function to get underlying value.
 *
 * @param {(func|string|array} val Value to call.
 * @param {array} args Arguments to pass to the value function, if applicable.
 * @returns {string|array};
 */
const getValFromFunction = (val, ...args) => (
  'function' === typeof val ? val(...args) : val
);

/**
 * Reducer function to convert the values of a `head` config object into strings.
 *
 * For example, if one value in the object was an array of <script> tags,
 * these tags would be concatenated into a single string in preparation for rendering in the app.ejs template.
 *
 * @param {string} config Current head configuration
 * @param {object} key Key to convert into a string
 * @return {object}
 */
const stringifyHeadConfig = (config, key) => {
  let value = getValFromFunction(config[key]);

  // If val is an array or above function returns an array, map through it.
  if (Array.isArray(value)) {
    // Call any functions in this array (they should return strings)
    value = value.map((curr) => getValFromFunction(curr)).join('');
  }

  // Merge in newly stringified value.
  return {
    ...config,
    [key]: value,
  };
};

/**
 * Retrieve configured variables for a given express template (app or error)
 *
 * @param {string} key Key for configured functions for getting template vars.
 * @param {object} initialVars Variables passed in from serverRenderer.
 * @param {object} clientStats Webpack client-side build stats object.
 * @return {object}
 */
export default function getTemplateVars(key, initialVars, clientStats) {
  const templateVars = getConfigValues(key);

  // Separate arrays for head configuration and other template variables,
  // as they will be extracted and merged using different methods.
  // const varsConfigs = [];
  const headConfigs = [];

  /**
   * Normalize each provided config (from user, packages, etc.).
   *
   * IMPORTANT: each config function must only be called once, otherwise we will make a new instance of variables inside
   * config function, causing problems with certain packages (like styled components, lodable).
   */
  const mergedVars = templateVars.reduce(
    (acc, varsConfig) => {
      const varsObject = getValFromFunction(varsConfig, acc, clientStats);
      // Separate arrays for head configuration and other template variables,
      // as they will be extracted and merged using different methods.
      if (varsObject.head) {
        headConfigs.push(varsObject.head);
      }

      return mergeWith(
        acc,
        omit(['head'], varsObject),
        (objValue, srcValue) => {
          if (Array.isArray(objValue)) {
            return objValue.concat(srcValue);
          }

          return undefined;
        }
      );
    },
    initialVars
  );

  // Merge template vars.
  const { Wrapper } = mergedVars;

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const appHtml = renderToString(<Wrapper />);

  // Stringify values for both default config (to ensure all head values are present)
  // and intial variables passed in via parameter (to ensure any core `head` properties are present)
  const stringifiedConfigs = [
    defaultHead,
    // Spread to prevent mutation
    { ...initialVars.head },
  ].concat(headConfigs).map((config) => {
    const headObject = getValFromFunction(config);
    // Reduce through each value in the head object and turn it into a string.
    return Object.keys(headObject).reduce(stringifyHeadConfig, config);
  }, {});

  const mergedHead = {};
  /* eslint-disable */
  for (const headKey of Object.keys(defaultHead)) {
    mergedHead[headKey] = stringifiedConfigs
      .map((config) => {
        return config[headKey] ? config[headKey] : ''
      })
      .join('');
  }
  /* eslint-enable */

  return {
    ...mergedVars,
    head: mergedHead,
    appHtml,
  };
}
