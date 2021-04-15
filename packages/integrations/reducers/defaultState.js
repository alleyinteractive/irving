export const manager = {
  componentMap: [],
  hydrated: false,
};

export const pico = {
  contentReady: false,
  signal: {},
  pageInfo: {},
  visited: false,
  lifecycle: {
    scriptAdded: false,
    scriptOnload: false,
    init: false,
    ready: false,
    loaded: false,
    updated: false,
  },
};

export const coral = {};

export default {
  manager,
  pico,
  coral,
};
