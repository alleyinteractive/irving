/**
 * Site-wide IDs and misc. configuration strings.
 *
 * Some optional values use `undefined` to simplify value checks.
 */
module.exports = function() {
  const environment = process.env.ELEVENTY_ENV;
  const isDev = ('development' === environment);

  // Set the production site's domain.
  const clientDomain = 'irvingjs.com';

  // Transform values based on the current environment.
  const domain = isDev ? 'localhost:8080' : clientDomain;
  const url = `${isDev ? 'http' : 'https'}://${domain}`;

  return {
    // URLs.
    domain,
    url,
    // For instances of the domain in legal settings, where we'd never want/need the dynamic domain.
    clientDomain,

    strings: {
      legalName: 'Alley Interactive, LLC',
      parentCompany: 'Alley',
      shortName: 'Irving',
    },

    meta: {
      title: 'Irving',
      description: 'Learn more about Irving, a headless React-based framework for use with WordPress.',
      // OS app icon color.
      themeColor: '#00b1ff',
      // Asset version.
      version: '1.0.0',
    },

    contact: {
      // Each line of the address.
      address: [],
      phone: '',
      email: 'owen@alley.co',
      twitterUsername: '@alleydev',
    },

    fonts: {
      // The full Google Fonts stylesheet URL, with query parameters.
      google: undefined,
      // The Typekit `kitId` value.
      typekitId: undefined,
    },

    thirdParty: {
      picoId: undefined,
      gtmId: '',
      gaId: 'G-WHBDXXT9FC',
    },
  };
};
