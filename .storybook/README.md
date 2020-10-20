# Storybook
Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

This Storybook instance is currently responsible for Irving documentation.

It is available at [storybook.irvingjs.com](http://storybook.irvingjs.com).

**Workflow**

Upon releasing a package, you should also deploy the Storybook. Do not release Storybook until you have already merged into `main`.

_Publishing documentation should follow the same code review/pull request process as writing feature code._

**Commands**
* `npm run storybook` - Run the Storybook locally on port 6006.
* `npm run build-storybook` - Build the static Storybook in `/storybook-static/`.
* `npm run deploy-storybook` - Deploy the built Storybook.
* `npm run release-storybook` - Build and deploy.

**Hosting**

Storybook is currently hosted on [surge.sh](https://surge.sh/). If you need access to push documentation changes, reach out to someone on the Irving team.

* To [install surge](https://surge.sh/help/getting-started-with-surge) globally run,
  * `npm install --global surge`
* To [add new users](https://surge.sh/help/adding-collaborators) to Surge `cd` into the Irving repo (this repo!) and deploy with the `add` flag,
  * `surge ./storybook-static storybook.irvingjs.com --add james@alley.co`
