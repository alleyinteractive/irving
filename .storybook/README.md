# Storybook
Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

**Available Storybooks**
* [Styled Components](styled-components-storybook.irvingjs.com)

**Workflow**
As part of the Irving package release process, you should also deploy all storybooks.

**Commands**
* `release-storybooks` - Build and deploy all Storybooks.

_Note: Storybooks are currently hosted on surge.sh. You may need to be authorized in order to do this. Please check with Irving maintainers if you need access._

## [Styled Components](styled-components-storybook.irvingjs.com)
Provides documentation on the components in `@irvingjs/styled-components`.

**Commands**
* `styled-components-storybook` - Run the storybook locally on port 6006.
* `build-styled-components-storybook` - Build the static storybook in `.storybook-styled-components`.
* `deploy-styled-components-storybook` - Deploy the storybook using Surge to .

_Note: It's important you run these commands from the root Irving repo, and not the Styled Components package._