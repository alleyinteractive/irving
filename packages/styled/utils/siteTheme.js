import get from 'lodash/get';

const siteTheme = (valuePath, defaultValue = '') => (props) => (
  get(props, `theme.${valuePath}`, defaultValue)
);

export default siteTheme;
