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

  // Create HoCs.
  const wrapWithThemes = withThemes(
    WrappedComponent.displayName,
    mergedThemeMap,
    composes
  );

  return wrapWithThemes(WrappedComponent);
};

/** @component */
export default createWithUserThemes;
