# VIP Go node server setup
This package contains implementations of WordPress VIP's helpers for caching, logging, and monitoring with Newrelic.

## Installation
1. `npm install @irvingjs/vip-go`
2. Import and add the vip go server configuration file to your project's `irving.config.server.js` file:
```javascript
const config = require('@irvingjs/vip-go/irving.config.server.js')

module.exports = {
    packages: [
        config,
    ],
    ...
};
```
3. Update your `package.json` to use the vip-go-friendly build script:
```json
{
    "scripts": {
        "build": "if [ -z $VIP_GO_APP_ID ]; then npm run webpack; else exit 0; fi",
    }
}
```
