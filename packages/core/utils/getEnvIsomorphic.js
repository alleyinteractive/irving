/* eslint-disable no-underscore-dangle */
const getEnvIsomorphic = () => (
  Object.keys(process.env).length ? process.env : window.__ENV__
);

export default getEnvIsomorphic;
/* eslint-enable */
