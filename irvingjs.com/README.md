# Irving landing page

An [Eleventy](https://www.11ty.dev/) site for irvingjs.com.

## Usage
Install dependencies and start the build.

```shell
npm install
npm start
```

The `start` script will open the page with BrowserSync and refresh when changes are detected.

To build the production-ready pages, run `npm run build`.

To test the build and verify production values prior to deploy, run `npm test`. This will re-build the site and serve the built files.

## Docs
See README in project directories for more information about the configuration.

See [11ty.dev](https://www.11ty.dev/) for 11ty-specific documentation.

## Commands
* `npm run start` - Opens the site locally for development.
* `npm run build` - Generates the static assets for deployment.
* `npm run test` - Runs the testing suite.
* `npm run deploy:production` - Builds and deploys to irvingjs.com
* `npm run deploy:staging` - Builds and deploys to staging.irvingjs.com

## Hosting
IrvingJS.com is currently hosted on [surge.sh](https://surge.sh/). If you need permission to deploy, reach out to someone on the Irving team.

* To [install surge](https://surge.sh/help/getting-started-with-surge) globally run,
  * `npm install --global surge`
* To [add new users](https://surge.sh/help/adding-collaborators) to Surge `cd` into the Irving repo (this repo!) and deploy with the `add` flag,
  * `surge ./dist --domain irvingjs.com --add james@alley.co`
