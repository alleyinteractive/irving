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

export const form = {
  submitting: false,
  submitted: false,
  failed: false,
  validation: {},
  redirect: '',
};

export const visible = {
  megaMenu: false,
  sliderAd: false,
  sliderAdHasClosed: false,
};

export const player = {
  currentTime: 0,
  duration: 0,
  loading: false,
  playing: false,
  seek: 0,
  src: '',
  visible: false,
  volume: 0.5,
};

export const story = {
  showFullText: false,
};

export const error = null;

export const loading = false;

export const componentData = {};

export const componentDataMeta = {
  loading: false,
  error: false,
  data: [],
};

export const headerHeight = 0;

export const isNoticeVisible = true;

const defaultState = {
  components,
  componentData,
  error,
  headerHeight,
  loading,
  player,
  route,
  visible,
};

export const zephr = {
  isLoading: true,
  forms: {},
  cached: false,
  session: {},
  user: {
    account: {},
    profile: {},
  },
};

export const zephrRules = {
  isLoading: false,
  components: {},
  pageIDs: {},
};

export const zephrDataLayer = {
  isLoading: false,
  dataLayer: {},
};

export default defaultState;
