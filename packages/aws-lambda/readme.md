## AWS Lambda Integration
This package can be used to facilitate the integration of Irving to [AWS Lambda](https://aws.amazon.com/lambda/).

The `@irvingjs/aws-lambda` package makes use of the [serverless-http](https://www.npmjs.com/package/serverless-http) package to better integrate to AWS Lambda. We also recommend using the `serverless` package to deploy to AWS. You can also integrate the deployment to AWS in your CI (process), if desired.

## Installation
1. `npm install -g serverless` and set it up to connect to AWS properly
2. You should have the `serverless` or `sls` commands available and properly authenticated locally.

## Project setup
1. `npm install @irvingjs/aws-lambda`
2. In the root of your Irving project, create an `index.js` (this file should have the same as the one in your `package.json` `main` key) file with the following content:
```javascript
// index.js

module.exports.irving = require('@irvingjs/core/server');
```
> The `irving` name exported will be the entry point for your AWS Lambda function to run your Irving site.
3. You also need to add the `aws-lambda` to the list of packages in `irving.config.server.js`. **There is no need to add it to the `irving.config.js`**:
```javascript
// irving.config.server.js

const lambdaConfig = require('@irvingjs/aws-lambda');

const config = {
  name: 'irving-dev-app',
  packages: [
    lambdaConfig,
  ],
};

module.exports = config;
```
4. In the root of Irving project, create a `serverless.yml` file with the following content (you can update as needed):
```yml
service: irving

provider:
  name: aws
  runtime: nodejs12.x
  region: sa-east-1
  memorySize: 512

functions:
  app:
    handler: index.irving # The same as your index.js exported key.
    events:
      - http:
          path: /
          method: ANY
      - http:
          path: /{any+}
          method: ANY
```
5. When you are ready to deploy your app, `npm install --production` to remove development dependencies
6. And run `npm run build` to build the app files
7. Finally, run `sls deploy` or `serverless deploy`

## Checking AWS Lambda support locally

The `@irvingjs/aws-lambda` packages comes with the `serverless-offline` package so that you can test your Irving site before deploying. Here are the steps if you need to use this package:

1. [Set up your project](#Project-setup) for AWS Lambda integration.
2. Add the `serverless-offline` plugin to the list:
```yml
service: irving

plugins:
  - serverless-offline

...
```
3. Finally, run `serverless offline` or `sls offline`.
