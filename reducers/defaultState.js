export const components = {
  defaults: [],
  page: {},
};

export const route = {
  status: null,
  redirectTo: false,
  action: '',
};

export const error = null;

export const loading = false;

const defaultState = {
  components,
  route,
  error,
  loading,
};

export default defaultState;
