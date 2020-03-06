import { getConfigObject } from '../utils/getConfigValue';

export const components = {
  defaults: [],
  providers: {},
  page: {},
};

export const route = {
  status: null,
  redirectTo: false,
  redirectStatus: 0,
  action: '',
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

const customDefaultState = getConfigObject('defaultState');

const defaultState = {
  components,
  componentData,
  error,
  loading,
  route,
  visible,
  ...customDefaultState,
};

export default defaultState;
