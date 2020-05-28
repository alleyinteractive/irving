## AWS Lambda Integration
This package can be used to facilitate the integration of Irving to [AWS Lambda](https://aws.amazon.com/lambda/).

The `@irvingjs/aws-lambda` package makes use of the [serverless-http](https://www.npmjs.com/package/serverless-http) package to better integrate to AWS Lambda. We also recommend using the `serverless` package deploy to AWS. You can also integrate the deployment to AWS in your CI (process), if desired.

### Usage

If you plan to use the `serverless` package to deploy to AWS, we recommend that you do that first and set it up correctly locally or via CI so that it can connect properly to AWS Lambda.

## Installation
1. `npm install -g serverless` and set it up to connect to AWS properly
2. `npm install @irvingjs/aws-lambda`
3. In the root of your Irving project, create an `index.js` (this file should have the same as the one in your `package.json` `main` key) file with the following content:
```javascript
module.exports.handler = require('@irvingjs/core/server');
```
4. You will also need to add the aws-lambda to the list of packages in `irving.config.server.js`:
```javascript
const lambdaConfig = require('@irvingjs/aws-lambda');

const config = {
  name: 'irving-dev-app',
  packages: [
    lambdaConfig,
  ],
};

module.exports = config;
```
5. In the root of Irving project, create a `serverless.yml` file with the following content (you can update as needed):
```yml
service: irving

provider:
  name: aws
  runtime: nodejs12.x
  region: sa-east-1
  memorySize: 512

functions:
  app:
    handler: index.handler
    events:
      - http:
          path: /
          method: ANY
      - http:
          path: /{any+}
          method: ANY
```
6. When you are ready to deploy your app, `npm install --production` to remove development dependencies
7. And run `npm run build` to build the app files
8. Finally, run `sls deploy` or `serverless deploy`
