# React Styleguidist for Irving.
This package contains an integration for React Styleguidist with Irving. All core components will

## Installation
1. `npm install @irvingjs/styleguide`
2. If you need to customize the core styleguide config, create a `config/styleguide.config.js` file and customize as necessary.
Documentation on configuration can be found [here](https://react-styleguidist.js.org/docs/configuration.html).
3. Update your `package.json` to include the styleguide scripts.
```json
{
    "scripts": {
        "styleguide:build": "NODE_ENV=production npx styleguidist build --config ./node_modules/@irvingjs/styleguide/config/styleguide.config.js",
        "styleguide:dev": "NODE_ENV=development npx styleguidist server --config ./node_modules/@irvingjs/styleguide/config/styleguide.config.js",
    }
}
```
