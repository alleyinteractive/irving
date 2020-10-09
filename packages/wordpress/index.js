import AdminBar from './components/adminBar';
import BlockStyles from './components/blockStyles';
import config from './irving.config';

const componentMap = {
  'irving/wp-admin-bar': AdminBar,
  'irving/block-styles': BlockStyles,
};

// Provide component as a named export.
export {
  AdminBar,
  BlockStyles,
  componentMap,
};

// Provide component map extension as a default export.
export default config;
