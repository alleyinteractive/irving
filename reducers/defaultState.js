export const components = {
  defaults: [],
  page: {},
};

export const route = {
  status: null,
  redirectTo: false,
  action: '',
};

export const form = {
  submitting: false,
  submitted: false,
  failed: false,
  validation: {},
  redirect: '',
};

export const visible = {};

export const error = null;

export const loading = false;

const defaultState = {
  components,
  route,
  error,
  loading,
  visible,
};

export default defaultState;
