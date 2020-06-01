# WordPress admin bar component

The WP Irving plugin automatically adds the component to the components endpoint
response for logged in users; however, you will see a "not configured" message
until you add the component to your component map:
```js
// componentMap.js

// Import it from the package.
import AdminBar from '@irvingjs/wp-admin-bar';

// Ensure it's included in the export.
export default {
  'irving/admin-bar': AdminBar,
};
```
