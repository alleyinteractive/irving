import { withStyles } from 'critical-style-loader/lib';
import withThemes from './withThemes';

const withUserThemes = (themeMap, composes) => (WrappedComponent) => {
  const styleSheets = Object.keys(themeMap)
    .map((themeName) => themeMap[themeName]);
  const wrapWithStyles = withStyles(...styleSheets);
  const wrapWithThemes = withThemes(
    WrappedComponent.displayName,
    themeMap,
    composes
  );

  return wrapWithThemes(wrapWithStyles(WrappedComponent));
};

export default withUserThemes;
