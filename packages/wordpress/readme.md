# WordPress
This package contains a number of helpers for working with a WordPress backend:
* Integration for displaying the WP Admin Bar.
* Helpers for setting up Gutenberg block styles.
* Configuration for commonly-used passthrough proxies for a WordPress backend.

## Admin Bar
This package contains a WordPress admin bar component.

### Installation
1. `npm install @irvingjs/wp-admin-bar`
2. The WP Irving plugin automatically adds the component to the components endpoint response for logged in users; however, you will see a "not configured" message until you add the component to your `componentMap.js` file at the root of your project:
```javascript
// Import it from the package.
import { AdminBar } from '@irvingjs/wp-admin-bar';

// Ensure it's included in the export.
export default {
  'irving/admin-bar': AdminBar,
};
```
