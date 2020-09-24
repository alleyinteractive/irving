import AdminBar from './components/adminBar';
import config from './irving.config';

const componentMap = {
  'irving/wp-admin-bar': AdminBar,
};

// Provide component as a named export.
export {
  AdminBar,
  componentMap,
};

// Provide component map extension as a default export.
export default config;
