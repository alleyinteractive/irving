import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default [
  {
    key: 'route.cookie',
    rehydrationFunction: () => cookies.getAll({ doNotParse: true }),
  },
];
