import get from 'lodash/get';

const siteTheme = (valuePath, defaultValue = '') => (props) => {
  let returnValue = valuePath;
  let loopDefaultValue = defaultValue;

  // Recursively look for the returned value in the theme provider until
  // the default is returned.
  do {
    loopDefaultValue = returnValue;

    returnValue = get(
      props,
      `theme.${returnValue}`,
      loopDefaultValue
    );
  } while (returnValue !== loopDefaultValue);

  return returnValue;
};

export default siteTheme;
