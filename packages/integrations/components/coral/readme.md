# Component for integrating Coral comments.

In order to integrate the Coral comments integration first you'll have to add the `irving/coral` component to the template JSON file for the specific template you want the embed to appear on. Example:
`single.json`
```json
    {
        "page": [
            {
                "name": "irving/coral",
                "config": {
                    "embed_URL": "https://mycoralhost.com"
                }
            }
        ]
    }
```
Second, you'll have to import the Coral integration component and associate it with the component's `name` in your `componentMap.js` file. Example:
```js javascript
import ComponentMap from '@irvingjs/styled-components';
import userThemes from './themes';
import { IntegrationsManager, CoralEmbed } from '@irvingjs/integrations';

export default {
  ...ComponentMap(userThemes),
  'irving/coral': CoralEmbed,
  'irving/integrations': IntegrationsManager,
};
```
The Coral embed will automatically render in DOM based on the component's location context in the JSON template. Instructions for configuring/installing a Coral instance can be found [in the Coral docs](https://docs.coralproject.net/coral/). The embed URL will be configured based on where the Coral instance is hosted. More information about the embed can be found [here](https://docs.coralproject.net/coral/v5/integrating/cms/).

## Pico
The Coral integration also comes bundled with a higher-order component wrapper for Pico that makes connecting the two in a project seamless. In order to use the connected component, you'll have to import it from the integrations package's component directory directly. The `withPico` wrapper is not part of the export map for the integrations package due to its specific use-case. The only change needed to use Coral with Pico will be in your `componentMap.js` file. Example:
```js javascript
import ComponentMap from '@irvingjs/styled-components';
import userThemes from './themes';
import { IntegrationsManager } from '@irvingjs/integrations';
import CoralEmbed from '@irvingjs/integrations/components/coral/withPico';

export default {
  ...ComponentMap(userThemes),
  'irving/coral': CoralEmbed,
  'irving/integrations': IntegrationsManager,
};
```
The process for including Coral inside of your project's template JSON will remain unchanged when using the `withPico` wrapper.  

_Note: In order for the Pico wrapper to render Coral, you'll have to have Pico running on your project. Information on how to do so can be found in the [Pico docs](https://help.trypico.com/en/articles/2905462-installing-the-wordpress-plugin)_