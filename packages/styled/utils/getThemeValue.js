import get from 'lodash/get';

/**
 * Utility to get a nested property value from the site theme provider within a
 * styled component.
 *
 * Example
 *   color: ${getThemeValue('irvingStyledComponents.link.color', 'black')};
 *
 * @param  {string} valuePath    Dot notation path to the desired value in
 *                               `props`.
 * @param  {mixed}  defaultValue Default value.
 * @return {mixed}
 */
const getThemeValue = (valuePath, defaultValue = null) => (props) => {
  return get(props, `theme.${valuePath}`, defaultValue);
};

export default getThemeValue;
