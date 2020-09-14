import React from 'react';
import { renderToString } from 'react-dom/server';
import omit from 'lodash/fp/omit';
import { mergeConfigValues } from 'config/irving/mergeConfigValues';
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
 * @param {object} initialVars Variables passed in from serverRenderer
 * @return {object}
 */
export default function getTemplateVars(key, initialVars) {
  const templateVars = getConfigValues(key);
  // Separate arrays for head configuration and other template variables,
  // as they will be extracted and merged using different methods.
  const varsConfigs = [];
  const headConfigs = [];
  // Normalize each provided config (from user, packages, etc.).
  const varsObjects = templateVars.map((vars) => (
    getValFromFunction(vars, initialVars)
  ));

  // Collect top-level vars (except head, which we'll handle after the app renders).
  varsObjects.forEach((obj) => {
    varsConfigs.push(omit(['head'], obj));
  });

  // Merge template vars.
  const mergedVars = mergeConfigValues(varsConfigs, initialVars);
  const { Wrapper } = mergedVars;

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const appHtml = renderToString(<Wrapper />);

  // Collect head objects.
  varsObjects.forEach((obj) => {
    headConfigs.push(getValFromFunction(obj.head));
  });

  // This seems to be necessary to prevent future mutation.
  const initialHead = { ...initialVars.head };

  // Stringify values for both default config (to ensure all head values are present)
  // and intial variables passed in via parameter (to ensure any core `head` properties are present)
  const stringifiedConfigs = [
    defaultHead,
    initialHead,
  ].concat(headConfigs).map((config) => (
    // Reduce through each value in the head object and turn it into a string.
    Object.keys(config).reduce(stringifyHeadConfig, config)
  ), {});

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
