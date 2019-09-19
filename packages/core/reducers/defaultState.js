import getConfigField from 'utils/getConfigField';

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
  error: false,
  data: [],
};

const defaultStateGetters = getConfigField('defaultState');
const customDefaultState = defaultStateGetters.reduce((acc, getter) => (
  { ...acc, ...getter() }
), {});

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
