# Storybook
Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

This Storybook instance is currently responsible for Irving documentation.

It is available at [storybook.irvingjs.com](http://storybook.irvingjs.com).

**Workflow**
Upon releasing a package, you should also deploy the Storybook.

**Commands**
* `npm run storybook` - Run the Storybook locally on port 6006.
* `npm run build-storybook` - Build the static Storybook in `/storybook-static/`.
* `npm run deploy-storybook` - Deploy the built Storybook.
* `npm run release-storybook` - Build and deploy.

_Note: The Irving Storybook is currently hosted on surge.sh. You may need to be authorized in order to do this. Please check with Irving maintainers if you need access._