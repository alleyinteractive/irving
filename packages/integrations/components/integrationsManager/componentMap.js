// Integration components.
import CoralEmbed from '../coral';
import YoastSchema from '../yoastSchema';
import JetpackSiteStats from '../jetpackSiteStats';
import GoogleAnalytics from '../googleAnalytics';
import Pico from '../pico';
import GoogleTagManager from '../googleTagManager';

// Declare a map of available integration components with a corresponding key.
export default [
  { key: 'coral', el: CoralEmbed },
  { key: 'yoastSchema', el: YoastSchema },
  { key: 'jetpackSiteStats', el: JetpackSiteStats },
  { key: 'googleAnalytics', el: GoogleAnalytics },
  { key: 'pico', el: Pico },
  { key: 'googleTagManager', el: GoogleTagManager },
];
