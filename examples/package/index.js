import Example from './components/example';
import config from './irving.config';

// Provide component as a named export.
export {
  Example,
  config,
};

// Provide component map extension as a default export.
export default {
  'irving/example': Example,
};
