import { useContext } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import memoize from 'lodash/memoize';
import { ThemeContext } from 'styled-components';

/**
 * Replace relevant style attribute values with values from site theme.
 *
 * @param {object} styleObject Object corresponding to style attribute.
 * @param {object} siteTheme Theme object passed in via React Context through Styled Components
 *   <ThemeProvider /> (https://styled-components.com/docs/advanced#theming).
 */
export const replaceWithSiteTheme = (styleObject, siteTheme) => (
  Object.keys(styleObject)
    .reduce((acc, property) => {
      /**
       * For every value passed in the style prop, check if the value is
       * actually a path to our ThemeContext.
       *
       * Example,
       *   Match:
       *    {color: theme.colors.black} => {color: #000;}
       *
       *   Recursive Match:
       *    {color: theme.fonts.color} =>
       *      {color: theme.colors.black} =>
       *        {color: #000}
       *
       *   No Match:
       *     {color: #000} => {color: #000;}
       */
      const themeStyle = get(
        siteTheme,
        styleObject[property],
        styleObject[property]
      );

      return {
        ...acc,
        [property]: themeStyle,
      };
    }, styleObject)
);

export const createComponentNameClass = memoize((componentName) => (
  componentName
    .replace(/(\/|\\)/, '__') // replace any back- or forward-slashes with double underscores.
    .replace(/[^_a-zA-Z0-9-]/g, '-') // replace any invalid character with a hyphen.
));

/**
 * Provide a component with a standardized set of props for that component to use.
 * @param {object} props    React comonent props.
 * @param {object} componentDefaults Overrides for default prop values.
 */
const useStandardProps = (props, componentDefaults = {}) => {
  const {
    className = '',
    id = '',
    style = {},
    tag = '',
    componentName,
  } = props;
  const componentNameClass = componentName ?
    createComponentNameClass(componentName) : '';
  // Using the `styled-components` ThemeContext, attempt to use dynamic
  // values in CSS properties.
  const siteTheme = useContext(ThemeContext);
  const standardizedProps = {
    className: classNames(
      className,
      componentNameClass,
      componentDefaults.className
    ),
    id: id || componentDefaults.id,
    style: replaceWithSiteTheme(
      { ...componentDefaults.style, ...style },
      siteTheme
    ),
  };

  /**
   * Styled Components `as` prop (https://styled-components.com/docs/api#as-polymorphic-prop).
   * Only set 'as' prop if tag is provided.
   */
  if (tag) {
    standardizedProps.as = tag;
  }

  return standardizedProps;
};

/** @component */
export default useStandardProps;
