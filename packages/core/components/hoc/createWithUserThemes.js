import { withStyles } from 'critical-style-loader/lib';
import withThemes from './withThemes';

const createWithUserThemes = (WrappedComponent, defaultStyles = {}) => (
  themeMap,
  composes = false
) => {
  // Merge user theme map with defaults.
  const mergedThemeMap = {
    default: defaultStyles,
    ...themeMap,
  };
  // Get stylesheets from user-provided themes for SSR.
  const styleSheets = Object.keys(mergedThemeMap)
    .map((themeName) => mergedThemeMap[themeName]);

  // Create HoCs.
  const wrapWithStyles = withStyles(...styleSheets);
  const wrapWithThemes = withThemes(
    WrappedComponent.displayName,
    mergedThemeMap,
    composes
  );

  return wrapWithThemes(wrapWithStyles(WrappedComponent));
};

/** @component */
export default createWithUserThemes;
