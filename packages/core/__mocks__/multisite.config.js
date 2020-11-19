module.exports = [
  {
    domain: 'multisite-one.irving.test',
    vars: {
      API_ROOT_URL: 'https://irving-multisite.test/api',
      ROOT_URL: 'https://multisite-one.irving.test',
      BASIC_AUTH_USERNAME: 'alley',
      BASIC_AUTH_PASSWORD: 'interactive',
      BASIC_AUTH: true,
    },
  },
  {
    domain: 'multisite-two.irving.test',
    vars: {
      API_ROOT_URL: 'https://irving-multisite-two.test/api',
      ROOT_URL: 'https://multisite-two.irving.test',
    },
  },
];
