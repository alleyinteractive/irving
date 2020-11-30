// Integration components.
import CoralEmbed from '../coral';
import JetpackSiteStats from '../jetpackSiteStats';
import GoogleAnalytics from '../googleAnalytics';
import Parsely from '../parsely';
import Pico from '../pico';
import GoogleTagManager from '../googleTagManager';

// Declare a map of available integration components with a corresponding key.
export default [
  { key: 'coral', el: CoralEmbed },
  { key: 'jetpackSiteStats', el: JetpackSiteStats },
  { key: 'googleAnalytics', el: GoogleAnalytics },
  { key: 'parsely', el: Parsely },
  { key: 'pico', el: Pico },
  { key: 'googleTagManager', el: GoogleTagManager },
];
