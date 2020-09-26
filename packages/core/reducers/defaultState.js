import {
  getValueFromConfig,
} from 'config/irving/getValueFromConfig';

export const components = {
  defaults: [],
  providers: {},
  page: {},
};

export const defaultProviderState = {
  current: {
    key: '',
    config: {},
  },
};

export const defaultProviderKey = 'default';

export const route = {
  status: null,
  redirectTo: false,
  redirectStatus: 0,
  action: '',
  cookies: {},
};

export const visible = {
  test: false,
};

export const error = null;

export const loading = false;

export const componentData = {};

export const componentDataMeta = {
  loading: false,
  loaded: false,
  error: false,
  data: [],
};

const defaultState = {
  components,
  componentData,
  error,
  loading,
  route,
  visible,
};

export default getValueFromConfig('defaultState', defaultState);
