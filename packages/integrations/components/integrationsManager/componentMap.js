// Integration components.
import CoralEmbed from '../coral';
import GoogleAnalytics from '../googleAnalytics';
import Pico from '../pico';

// Declare a map of available integration components with a corresponding key.
export default [
  { key: 'coral', el: CoralEmbed },
  { key: 'googleAnalytics', el: GoogleAnalytics },
  { key: 'pico', el: Pico },
];
