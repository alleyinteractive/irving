## Google Cloud Functions Integration
This package can be used to facilitate the integration of Irving to [Google Cloud Functions](https://cloud.google.com/functions).

The `@irvingjs/cloud-functions` package makes use of the [@google-cloud/functions-framework](https://www.npmjs.com/package/@google-cloud/functions-framework) package to better integrate to Google Cloud Functions.

You can also integrate the deployment to GCF in your CI (process), if desired.

### Installation
1. `npm install @irvingjs/cloud-functions`
2. In the root of your Irving project, create an `index.js` (this file should have the same as the one in the `package.json` main key) file with the following content:

```javascript
const { exportServer } = require('@irvingjs/cloud-functions');

module.exports.handler = exportServer;
```
3. When you are ready to deploy your app, `npm install --production` to remove development dependencies
4. And run `npm run build` to build the app files
5. Finally, run `gcloud app deploy`
