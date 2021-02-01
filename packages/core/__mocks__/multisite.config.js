module.exports = [
  {
    domain: 'multisite-one.irving.test',
    entry: {
      'multisite-one': './assets/sass/custom-styles.scss',
    },
    env: {
      API_ROOT_URL: 'https://irving-multisite.test/api',
      ROOT_URL: 'https://multisite-one.irving.test',
      BASIC_AUTH_USERNAME: 'alley',
      BASIC_AUTH_PASSWORD: 'interactive',
      BASIC_AUTH: true,
    },
  },
  {
    domain: 'multisite-two.irving.test',
    env: {
      API_ROOT_URL: 'https://irving-multisite-two.test/api',
      ROOT_URL: 'https://multisite-two.irving.test',
    },
  },
  {
    domain: 'multisite-three.irving.test',
    entry: {
      'multisite-three': './assets/sass/multisite-three.scss',
    },
    vars: {
      API_ROOT_URL: 'https://irving-multisite-three.test/api',
      ROOT_URL: 'https://multisite-three.irving.test',
    },
  },
];
