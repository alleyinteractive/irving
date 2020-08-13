// Integration components.
import GoogleAnalytics from '../googleAnalytics';
import CoralEmbed from '../coral';
import YoastSchema from '../yoastSchema';
import SiteStats from '../siteStats';

// Declare a map of available integration components with a corresponding key.
export default [
  { key: 'googleAnalytics', el: GoogleAnalytics },
  { key: 'coral', el: CoralEmbed },
  { key: 'yoastSchema', el: YoastSchema },
  { key: 'siteStats', el: SiteStats },
];
