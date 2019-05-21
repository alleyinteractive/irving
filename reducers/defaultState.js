export const components = {
  defaults: [],
  providers: {},
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

export const visible = {
  test: false,
};

export const error = null;

export const loading = false;

export const componentData = {
  loading: false,
  error: false,
  data: {},
};

const defaultState = {
  components,
  route,
  error,
  loading,
  visible,
};

export default defaultState;
