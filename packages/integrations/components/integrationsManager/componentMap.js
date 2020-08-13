// Integration components.
import CoralEmbed from '../coral';
import YoastSchema from '../yoastSchema';
import SiteStats from '../siteStats';
import GoogleAnalytics from '../googleAnalytics';
import Pico from '../pico';

// Declare a map of available integration components with a corresponding key.
export default [
  { key: 'coral', el: CoralEmbed },
  { key: 'yoastSchema', el: YoastSchema },
  { key: 'siteStats', el: SiteStats },
  { key: 'googleAnalytics', el: GoogleAnalytics },
  { key: 'pico', el: Pico },
];
