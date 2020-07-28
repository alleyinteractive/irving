import React from 'react';
import { renderToString } from 'react-dom/server';
import mapValues from 'lodash/fp/mapValues';
import {
  getConfigValues,
  getValueFromConfigNoMemo,
} from 'config/irving/getValueFromConfig';

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
 * @returns {string|array};
 */
const getValFromFunction = (val) => (
  'function' === typeof val ? val() : val
);

/**
 * Merge the value of a particular head field.
 * If provided an array of <script> tags, for example, these will be joined into a single string.
 *
 * @param {(array|func|string} val Value to turn into a string.
 * @returns {string};
 */
const convertHeadKeyToString = (val) => {
  let newVal = val;

  // Call function if provided.
  if ('function' === typeof newVal) {
    newVal = newVal();
  }

  // If val is an array or above function returns an array, map through it.
  if (Array.isArray(newVal)) {
    // Call any functions in this array (they should return strings)
    newVal = newVal.map((curr) => getValFromFunction(curr)).join('');
  }

  return newVal;
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
  const mergedTemplateVars = getValueFromConfigNoMemo(key, initialVars);
  const { Wrapper } = mergedTemplateVars;

  // This needs to happen first to ensure proper SSR rendering of stylesheets.
  const appHtml = renderToString(<Wrapper />);

  // Merge each head value from discovered template var configs.
  const normalizedHeadConfigs = templateVars
    .map((vars) => {
      // Get head object from function, if supplied, otherwise use as-is (and assume it's an object).
      const varsObject = getValFromFunction(vars);
      return getValFromFunction(varsObject.head);
    });

  // Reduce through each head config object
  const mergedHead = normalizedHeadConfigs
    .reduce((acc, config) => {
      // Reduce through each value in the head object and turn it into a string.
      const stringifiedConfig = Object.keys(config)
        .reduce((headAcc, headKey) => {
          const stringVal = convertHeadKeyToString(config[headKey]);

          // Concatenate stringified head value with same value in the accumulator, if it exists.
          return {
            ...headAcc,
            [headKey]: `${acc[headKey]}${stringVal}`,
          };
        }, {});

      // Merge accumulator and newly-stringified head object.
      return {
        ...acc,
        ...stringifiedConfig,
      };
    }, mapValues(() => '', defaultHead));

  return {
    ...mergedTemplateVars,
    head: mergedHead,
    appHtml,
  };
}
