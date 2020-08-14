import get from 'lodash/fp/get';

const siteTheme = (valuePath) => (props) => (
  get(`theme.${valuePath}`, props)
);

export default siteTheme;
