import getIrvingConfig from 'utils/getIrvingConfig';
import getMergedConfigField from 'utils/getMergedConfigField';

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

const defaultState = {
  components,
  componentData,
  error,
  loading,
  route,
  visible,
  ...getMergedConfigField(getIrvingConfig(), 'defaultState'),
};

export default defaultState;
