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