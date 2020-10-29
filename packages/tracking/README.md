# Tracking
This package contains an implementation of React Tracking that replaces the default no-op service.

## Installation
1. `npm install @irvingjs/tracking`
2. Add the Tracking package configuration to your local project configuration files:
In your `irving.config.js` file:
```javascript
import trackingConfig from '@irvingjs/tracking';

const config = {
  packages: [
    trackingConfig,
  ],
};

export default config;
```
