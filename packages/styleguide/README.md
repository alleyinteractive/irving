# React Styleguidist for Irving.
This package contains an integration for React Styleguidist with Irving. All core components will

## Installation
1. `npm install @irvingjs/styleguide`
2. Create a `config/styleguide.config.js` file to act as an entry point for your styleguide. This file should `import createStyleguideConfig from '@irvingjs/styleguide'` and use that function to generate the config. You may pass in any number of additional configs to be merged into the base config, including configs from Irving packages. Example:
```javascript
import createStyleguideConfig from '@irvingjs/styleguide';
import styledConfig from '@irvingjs/styled/config/styleguide.config.js';

const myConfig = {
    title: 'This is my styleguide',
};

module.exports = createStyleGuideConfig(myConfig, styledConfig);
```
3. You may call `createStyleguideConfig` with no parameters and the base config will be used as-is.
4. Proceed with caution if you intend to modify the `require`, `styleguideComponents`, `styleguideDir`, or `webpackConfig` config fields. Documentation on styleguidist configuration can be found [here](https://react-styleguidist.js.org/docs/configuration.html).
5. Update your `package.json` to include the styleguide scripts. Note these scripts should point to the config you created in step 2.
```json
{
    "scripts": {
        "styleguide:build": "BABEL_ENV=app NODE_ENV=production npx styleguidist build --config ./config/styleguide.config.js",
        "styleguide:dev": "BABEL_ENV=app NODE_ENV=production npx styleguidist build --config ./config/styleguide.config.js",
    }
}
```
