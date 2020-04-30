import withThemes from './withThemes';

const createWithUserThemes = (
  WrappedComponent,
  defaultThemeMap = {}
) => (themeMap) => {
  // Merge user theme map with defaults.
  const mergedThemeMap = {
    default: defaultThemeMap,
    ...themeMap,
  };

  return withThemes(mergedThemeMap)(WrappedComponent);
};

/** @component */
export default createWithUserThemes;
