const getEnv = () => (
  Object.keys(process.env).length ? process.env : window.__ENV__ // eslint-disable-line no-underscore-dangle
);

export default getEnv;
