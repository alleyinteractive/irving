# React Styleguidist for Irving.
This package contains an integration for React Styleguidist with Irving. All core components will

## Installation
1. `npm install @irvingjs/styleguide`
2. If you need to customize the core styleguide config, create a `config/styleguide.config.js` file and customize as necessary. This file should export a function returning any customizations to the styleguide config. These customizations will be deeply merged into the base config. NOTE: proceed with caution if you intend to modify the `require`, `styleguideComponents`, `styleguideDir`, or `webpackConfig` config fields.
Documentation on styleguidist configuration can be found [here](https://react-styleguidist.js.org/docs/configuration.html).
3. Create a `styleguide.js` file (or name it something custom) to act as the entry point for your styleguide config. You will point the styleguide scripts toward this file. This is currently necessary to ensure paths are resolved correctly for all packages/configurations.
4. Update your `package.json` to include the styleguide scripts.
```json
{
    "scripts": {
        "styleguide:build": "BABEL_ENV=app NODE_ENV=production npx styleguidist build --config ./styleguide.js",
        "styleguide:dev": "BABEL_ENV=app NODE_ENV=production npx styleguidist build --config ./styleguide.js",
    }
}
```
