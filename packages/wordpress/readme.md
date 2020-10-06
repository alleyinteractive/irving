# WordPress
This package contains a number of helpers for working with a WordPress backend:
* Integration for displaying the WP Admin Bar.
* Helpers for setting up Gutenberg block styles.
* Configuration for commonly-used passthrough proxies for a WordPress backend.

## Installation
1. `npm install @irvingjs/wordpress`
2. Add the `@irvingjs/worpdress` componentMap to your project's `componentMap.js`:

```javascript
// Import it from the package.
import { componentMap } from '@irvingjs/wordpress';

// Ensure it's included in the export.
export default {
  ...componentMap,
};
```
3. If using the `BlockStyles` component, you will need to add this component in the location of your choice in your JSON template yourself. It's name in the component map is `irving/block-styles`.
4. No additional steps are necessary to display the admin bar component.

## Features of this package
This package contains several handy and commonly-used features for using Irving with WordPress: a WP Admin Bar component, a component for syling Gutenberg blocks, and some configuration presets specific to the WordPress backend.

### Admin Bar
This component displays the familiar WP Admin Bar for logged-in users. This is accomplished via an iframe to wp-admin, sized approrpriately to only display the admin bar.

As mentioned above, this component will automatically be added to your components endpoint for logged-in users. The only additional step you need to take to get the Admin Bar to display is adding the `@irvingjs/wordpress` component map to your own project's component map, as illustrated in the _Installation_ section above.

### Block Styles

