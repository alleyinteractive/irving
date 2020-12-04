/**
 * Site-wide IDs and misc. configuration strings.
 *
 * Some optional values use `undefined` to simplify value checks.
 */
module.exports = function() {
  const environment = process.env.ELEVENTY_ENV;
  const isDev = ('development' === environment);

  // Set the production site's domain.
  const clientDomain = 'irving.com';

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
      description: 'Irving Landing Page',
      // OS app icon color.
      themeColor: '#77A5A4',
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
    },
  };
};
