## Irving Integrations
A collection of Irving-friendly components for getting you started with common third-party integrations.

### Components
* `<DisqusEmbed />` - Embed an iframe for Disqus comments.
* `<GoogleAnalytics />` - Render the required JS snippet for your GA account.
* `<GoogleTagManager />` - Render the required JS snippet for your GTM account.
* `<Parsely />` - Render the required JS for sending data to Parse.ly
* `<YoastSchema />` - Render the required JS for Yoast.
---
### `<IntegrationsManager />`
The integrations manager is a component that consumes a `irving/integrations` configuration retrieved from the REST API that dynamically configures, stores props for, and renders corresponding integrations based on the keys set in the configuration object.

### Configuration
Configuring the integrations manager is a simple process. First, add the `irving/integrations` component as a default in your `templates/defaults.json` file. Example:
```json
{
	"defaults": [
		{
			"name": "irving/integrations",
			"children": []
        },
	]
}
```
Second, add the integrations manager component to the irving componentMap. Example:
```js javascript
import { IntegrationsManager } from '@irvingjs/integrations';

export default {
    'irving/integrations': IntegrationsManager,
};
```
Second, import the irving config from the integrations package and add the imported config to the `packages` section of your project's `irving.config.js` file. Example:
```js javascript
import integrationsConfig from '@irvingjs/integrations';

export default {
    packages: [
        integrationsConfig,
    ],
};
```
Importing the configuration is required in order to connect the Integration Manager to the global Redux state tree and add the `integrations` branch to the store. The integrations currently available to manage through the integrations manager include:
* `<GoogleAnalytics />`
  * Key: `googleAnalytics`
  * Accepted Props: `trackingId`
* `<CoralEmbed />`
  * Key: `googleAnalytics`
  * Accepted Props: `rootURL`
* `<Pico />`
  * Key: `pico`
  * Accepted Props: `pageInfo`, `publisherId`
* `<YoastSchema />`
  * Key: `googleAnalytics`
  * Accepted Props: `content`
* `<JetpackSiteStats />`
  * Key: `siteStats`
  * Accepted Props: `data`

Configurations can also be managed manually through your irving configuration file. In order to do so, all you have to do is specify the integration's key and properties to be passed into its configuration. Example:
```js javascript
import integrationsConfig from '@irvingjs/integrations';

export default {
    packages: [
        integrationsConfig,
    ],
    integrations: {
        googleAnalytics: {
            trackingId: 'UA-000000-0',
        },
    },
};
```
_Any configurations that are set manually in `irving.config.js` will override those that are retrieved from the REST API._
