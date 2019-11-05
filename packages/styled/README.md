# Styled Components Integration
This package contains support for `styled`, `css` and associated functions. Currently this packages implements `styled-components`,
but the underlying logic maybe replaced by another library (like `emotion`) in the future.

## Installation
1. `npm install @irvingjs/styled`
2. Import and add the styled server configuration file to your project's `irving.config.server.js`:
```javascript
const styledComponentsConfig = require('@irvingjs/styled');

module.exports = {
    packages: [
        styledComponentsConfig,
    ],
    ...
};
```

2. Import and add the styled client configuration file to your project's `irving.config.js`:
```javascript
import styledComponentsConfig from '@irvingjs/styled-components';

const irvingConfig = {
    packages: [
        styledComponentsConfig,
    ],
    ...
};

export default irvingConfig;
```
